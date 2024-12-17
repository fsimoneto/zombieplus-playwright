const { test } = require("../support")

test("deve logar como admin", async ({ page }) => {
   await page.login.visit()
   await page.login.submit('admin@zombieplus.com', 'pwd123')
   await page.movies.isLoggedIn()
});

test("nao deve logar com senha incorreta", async ({ page }) => {
   await page.login.visit()
   await page.login.submit('admin@zombieplus.com', 'abc123')

   const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
   await page.toast.containText(message)
});

test("nao deve logar com email invalido", async ({ page }) => {
   await page.login.visit()
   await page.login.submit('www.felipe.com.br', 'abc123')
   await page.login.alertHaveText('Email incorreto')
});

test("nao deve logar com email vazio", async ({ page }) => {
   await page.login.visit()
   await page.login.submit('', 'abc123')
   await page.login.alertHaveText('Campo obrigatório')
});

test("nao deve logar com senha vazia", async ({ page }) => {
   await page.login.visit()
   await page.login.submit('admin@zombieplus.com', '')
   await page.login.alertHaveText('Campo obrigatório')
});

test("nao deve logar com todos campos vazios", async ({ page }) => {
   await page.login.visit()
   await page.login.submit('', '')

   await page.login.alertHaveText([
      'Campo obrigatório',
      'Campo obrigatório'
   ])
});