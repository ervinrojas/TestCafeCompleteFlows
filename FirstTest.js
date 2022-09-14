// JavaScript source code
import { Selector, t } from 'testcafe';
import { ClientFunction } from 'testcafe';

const getElementsByXPath = Selector(xpath => {
    const iterator = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
    const items = [];
    let item = iterator.iterateNext();
    while (item) {
        items.push(item);
        item = iterator.iterateNext();
    }
    return items;
});
export default function (xpath) {
    return Selector(getElementsByXPath(xpath));
}

//const getLocation = ClientFunction(() => document.location.href.toString());

fixture`Getting Started`
    .page`https://www.unosquare.com/ContactUs`;

test('Script1', async t => {
    const getLocation = ClientFunction(() => window.location);
    await t
        .maximizeWindow()
        .expect(Selector('input[name = "name"]').visible).ok()
        .typeText('input[name = "name"]', 'My Name')
        .typeText('input[name = "email"]', 'Myemail@unosquare.com')
        .typeText('textarea[name = "message"]', 'The script can write a message!')
        .scrollBy(0. -500)
        .click(Selector(getElementsByXPath("//*[@id='navbarSupportedContent']//li//a[contains(@href, 'https://blog.unosquare.com')]")))
        .expect(Selector('input[name = "query"]').visible).ok()
        .typeText('input[name = "query"]', 'WHAT IS QA TESTING?')
        .click(Selector(getElementsByXPath("//*[@id='side-bar-container']/form/button")))
        .expect(Selector('.title-header > a').exists).ok('Exist a search result')
        .scrollBy(0. -500)
        .expect(Selector('.post-item > div > a').exists).ok('Exist a button')
});

test('Script2',async t => {
    await t
        .maximizeWindow()
        .typeText('form[action="/search"] > div:nth-child(1) > div:nth-child(1) > div:nth-of-type(1) > div > div:nth-of-type(2)', 'Test Cafe Automation')
        .pressKey('enter')
        .click(Selector('a').withAttribute('href','https://testcafe.io/'))
        .expect(Selector('a').withText('Get Started').exists).ok()
        
}).page`http://www.google.com`;

