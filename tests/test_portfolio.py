from html.parser import HTMLParser
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]


class LinkParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.ids = set()

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if "id" in values:
            self.ids.add(values["id"])
        if tag in {"a", "link", "script"}:
            self.links.append(values.get("href") or values.get("src"))


class PortfolioTest(unittest.TestCase):
    def test_all_local_links_exist(self):
        for html_file in ROOT.rglob("*.html"):
            parser = LinkParser()
            parser.feed(html_file.read_text(encoding="utf-8"))
            for link in filter(None, parser.links):
                if link.startswith(("http://", "https://", "mailto:", "#")):
                    continue
                target = (html_file.parent / link.split("#", 1)[0]).resolve()
                self.assertTrue(target.exists(), f"Broken link in {html_file}: {link}")

    def test_home_has_required_cv_sections(self):
        parser = LinkParser()
        parser.feed((ROOT / "index.html").read_text(encoding="utf-8"))
        self.assertTrue({"profile", "evidence", "contact"}.issubset(parser.ids))

    def test_every_case_stays_honest_about_scope(self):
        for case in (ROOT / "evidence").glob("*.html"):
            text = case.read_text(encoding="utf-8").lower()
            self.assertIn("scope trung thực", text)


if __name__ == "__main__":
    unittest.main()
