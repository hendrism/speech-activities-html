#!/usr/bin/env python3
"""
Audit activity HTML files for compliance with the activity standard.

Compliance rules:
  1. No <style> block in the file
  2. References data-loader.js
  3. No inline data arrays (ACTIVITY_DATA, stories, scenarios, etc.)
  4. <body> has a category-* class

Usage:
  python3 scripts/audit_activities.py
  python3 scripts/audit_activities.py --category articulation
  python3 scripts/audit_activities.py --summary
"""

import re
import sys
import argparse
from pathlib import Path

ROOT = Path(__file__).parent.parent
ACTIVITIES_DIR = ROOT / "activities"
CATEGORIES = ["articulation", "fluency", "grammar", "reading", "social", "vocabulary"]

# Files with known approved exceptions (will show as PARTIAL — expected)
KNOWN_EXCEPTIONS = {"activities/vocabulary/image-viewer.html"}

INLINE_DATA_PATTERNS = [
    (r'const\s+ACTIVITY_DATA\s*=\s*\[',  'ACTIVITY_DATA array'),
    (r'const\s+stories\s*=\s*\[',         'stories array'),
    (r'const\s+items\s*=\s*\[',           'items array'),
    (r'const\s+scenarios\s*=\s*\[',       'scenarios array'),
    (r'const\s+questions\s*=\s*\[',       'questions array'),
    (r'const\s+wordList\s*=\s*\[',        'wordList array'),
    (r'const\s+words\s*=\s*\[',           'words array'),
    (r'const\s+activityData\s*=\s*\[',    'activityData array'),
    (r'const\s+passages\s*=\s*\[',        'passages array'),
    (r'const\s+starters\s*=\s*\[',        'starters array'),
    (r'const\s+data\s*=\s*\[',            'data array'),
    (r'window\.wordDefinitions\s*=',       'window.wordDefinitions'),
    (r'window\.contextClues',              'window.contextClues'),
]

def audit_file(path):
    """Return (status, [issues]) for a single HTML file."""
    try:
        content = path.read_text(encoding="utf-8")
    except Exception as e:
        return "❌ NON-COMPLIANT", [f"could not read file: {e}"]

    issues = []

    if re.search(r'<style[\s>]', content, re.IGNORECASE):
        issues.append("has <style> block")

    if "data-loader.js" not in content:
        issues.append("missing data-loader.js")

    for pattern, label in INLINE_DATA_PATTERNS:
        if re.search(pattern, content):
            issues.append(f"inline data: {label}")
            break

    if not re.search(r'<body[^>]+class=["\'][^"\']*category-', content):
        issues.append("missing body category-* class")

    if not issues:
        return "✅ COMPLIANT", []
    elif len(issues) >= 2:
        return "❌ NON-COMPLIANT", issues
    else:
        return "⚠️  PARTIAL", issues


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--category", help="Audit one category only")
    parser.add_argument("--summary", action="store_true", help="Print counts only")
    args = parser.parse_args()

    if args.category and args.category not in CATEGORIES:
        print(f"ERROR: unknown category '{args.category}'. Valid: {', '.join(CATEGORIES)}", file=sys.stderr)
        sys.exit(1)

    categories = [args.category] if args.category else CATEGORIES
    results = {"✅ COMPLIANT": [], "⚠️  PARTIAL (expected)": [], "⚠️  PARTIAL": [], "❌ NON-COMPLIANT": []}

    for cat in categories:
        cat_dir = ACTIVITIES_DIR / cat
        if not cat_dir.exists():
            print(f"WARNING: {cat_dir} not found", file=sys.stderr)
            continue
        for f in sorted(cat_dir.glob("*.html")):
            status, issues = audit_file(f)
            rel = str(f.relative_to(ROOT))
            if rel in KNOWN_EXCEPTIONS:
                status = "⚠️  PARTIAL (expected)"
                issues = [i + " (approved exception)" for i in issues]
            results[status].append((rel, issues))

    if args.summary:
        total = sum(len(v) for v in results.values())
        print(f"Total:         {total}")
        print(f"Compliant:     {len(results['✅ COMPLIANT'])}")
        print(f"Partial (expected): {len(results['⚠️  PARTIAL (expected)'])}")
        print(f"Partial:       {len(results['⚠️  PARTIAL'])}")
        print(f"Non-compliant: {len(results['❌ NON-COMPLIANT'])}")
        return

    for status, files in results.items():
        if not files:
            continue
        print(f"\n{status} ({len(files)} files)")
        for path, issues in files:
            print(f"  {path}")
            for issue in issues:
                print(f"    - {issue}")

    total = sum(len(v) for v in results.values())
    print(f"\n── Summary ──────────────────────────────")
    print(f"Total:         {total}")
    print(f"Compliant:     {len(results['✅ COMPLIANT'])}")
    print(f"Partial (expected): {len(results['⚠️  PARTIAL (expected)'])}")
    print(f"Partial:       {len(results['⚠️  PARTIAL'])}")
    print(f"Non-compliant: {len(results['❌ NON-COMPLIANT'])}")


if __name__ == "__main__":
    main()
