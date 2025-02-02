import { Browser, chromium, Page } from "playwright";
import HttpError from "../utils/http-error/http-error";
import { TWO_MINUTES_TIMEOUT } from "../constants/index";

class PlaywrightService {
  #browser?: Browser;
  #page?: Page;
  #onRecaptcha?: () => void;
  #onRecaptchaResolve?: () => void;

  onRecaptcha(onRecaptcha: () => void) {
    this.#onRecaptcha = onRecaptcha;
  }

  onRecaptchaResolve(onRecaptchaResolve: () => void) {
    this.#onRecaptchaResolve = onRecaptchaResolve;
  }

  async init() {
    if (this.#browser) {
      await this.#browser.close();
    }

    this.#browser = await chromium.launch({
      args: ["--no-sandbox"],
    });

    const context = await this.#browser.newContext();

    this.#page = await context.newPage();
  }

  async close() {
    await this.#page?.close();
    this.#page = undefined;
    await this.#browser?.close();
    this.#browser = undefined;
  }

  async goto(url: string) {
    if (!this.#page) {
      throw new HttpError(500, "Browser is not initialized");
    }

    await this.#page.goto(url, { waitUntil: "domcontentloaded" });

    const recaptchaIframe = await this.#page.$("#captcha-form");

    if (recaptchaIframe) {
      this.#onRecaptcha?.();

      await this.#page.waitForNavigation({ timeout: TWO_MINUTES_TIMEOUT });

      this.#onRecaptchaResolve?.();
      return;
    }
  }

  async getPageContent() {
    return await this.#page?.content();
  }

  async checkKeyword(keyword: string, site: string) {
    const elements = await this.#page?.evaluate(() =>
      [...document.querySelectorAll("h3")]
        .filter((el) => el.offsetHeight > 0 && el.offsetWidth > 0)
        .map((el) => el.closest("a"))
        .map((el) => ({
          href: el?.href,
          text: el?.querySelector("h3")?.innerText,
        }))
    );

    const resultIndex =
      elements?.findIndex(
        (el) =>
          el.href?.includes(site) &&
          el.text?.toLowerCase()?.includes(keyword.toLowerCase())
      ) || 0;

    if (resultIndex !== -1) {
      await this.#page?.evaluate((resultIndex) => {
        const elements = [...document.querySelectorAll("h3")].filter(
          (el) => el.offsetHeight > 0 && el.offsetWidth > 0
        );
        const item = elements[resultIndex]
          ?.closest("a")
          ?.closest("div[jscontroller]");
        if (!item) return;
        (item as HTMLElement).style.border = "2px solid red";
      }, resultIndex);
    }

    return resultIndex;
  }

  async screenshot(options?: { fullPage?: boolean; path?: string }) {
    if (!this.#page) {
      throw new HttpError(500, "Browser is not initialized");
    }

    return await this.#page.screenshot(options);
  }

  click(x: number, y: number) {
    this.#page?.mouse.click(x, y);
  }
}

export default PlaywrightService;
