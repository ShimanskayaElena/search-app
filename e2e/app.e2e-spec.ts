import { SearchAppPage } from './app.po';

describe('search-app App', () => {
  let page: SearchAppPage;

  beforeEach(() => {
    page = new SearchAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
