/// <reference types="cypress" />

describe('template spec', () => {
    it('Login', () => {
        cy.visit('/')
        cy.get('#id').type('UN') // input username
        cy.get('#id').focus().type('PW') // input password
        cy.get().click()
    })


// 瀏覽器頁面導航操作
    it('command', () => {
        cy.visit('/');
        cy.go(-1)
        cy.go('back')
        cy.go('forward')    // 1也是前進
        cy.reload()
        cy.title()  //  獲取頁面標題，.url是獲得URL
        // 元素定位。  
            // F12：找到對應#id or 複製selector。
            // Cypress工具：輔助按鈕：Open selector playground，直接顯示元素id
        cy.get().children(selector) //通過父元素找子元素。例如form表單
        cy.get().parent()
        sibling() // let=元素之後的函數，再找下一個元素。
        prev()
        next()
        within( ($form) => { cy.get('input:first').type() } ) // cypress3 特殊的函數，同時獲取多個子元素。裏面是回調函數。
        contains("Submit").click() // cypress4 查找submit
        // 用戶操作。
        .focus().type()    // 確認光標
        .type().blur() // 取消光標
        .clear()
        .submit()
        .dbclick()
        .rightclick()
        // 元素的選擇操作，單選/多選 / 下拉框
        .uncheck() // 單選
        .not('[disabled]').check(['a','b']) // 多選方式
        .select()   //下拉框，又分單選多選
        // 滾動
        .scrollIntoView().type()// 滑動到可視範圍之内
        .wait(2000)
        .scrollTo('top') //通過指定位置(0,200)/百分比('0%','50%')

    }); 

    it('斷言/判斷1', () => {
        cy.url().should('include',"login");
        cy.title().should('include',"登錄");
        cy.should.be.a("string");
        cy.should.equal("value");

    }); 



});
