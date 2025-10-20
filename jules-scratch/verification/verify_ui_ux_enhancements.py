
from playwright.sync_api import sync_playwright, Page, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        page.goto("http://localhost:8000")

        # Wait for the hero image to load
        hero_image = page.locator("img[alt*='Seorang pekerja konstruksi Indonesia']")
        expect(hero_image).to_be_visible()

        # Take a screenshot of the hero section
        hero_section = page.locator("section[aria-labelledby='hero-title']")
        expect(hero_section).to_be_visible()
        page.screenshot(path="jules-scratch/verification/01_hero_section.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
