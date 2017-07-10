import { MyDemoPage } from './app.po';

describe('my-demo App', () => {
  let page: MyDemoPage;

  beforeEach(() => {
    page = new MyDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
