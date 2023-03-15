import { test, expect } from "@playwright/test";

// FOLLOW GIVEN-WHEN-THEN PRICIPLE
test.describe("Login", () => {
	test("비 로그인 상태에서 루트페이지로 가면 로그인 페이지로 이동한다.", async ({
		page,
	}) => {
		await page.goto("http://localhost:5173");
		await expect(page).toHaveURL("http://localhost:5173/login");
	});

	test("구글 로그인 버튼을 눌러 팝업을 띄운 뒤, 구글 로그인을 시도한다.", async ({
		page,
	}) => {
		await page.goto("http://localhost:5173/login");
		const popupPromise = page.waitForEvent("popup");
		await page.getByText("Google 계정으로 시작하기").click();
		const popup = await popupPromise;
		await popup.getByText("Chanhee Jang").click();
		await expect(page).toHaveURL("http://localhost:5173/daily");
	});
});
