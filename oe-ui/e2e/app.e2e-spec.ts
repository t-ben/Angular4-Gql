import { AppPage } from './app.po';

describe('client App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display providers list title', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Providers List Component');
  });
});
