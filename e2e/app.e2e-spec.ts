import { AngularCompleteGuidePage } from './app.po';

describe('angular-complete-guide App', () => {
  let page: AngularCompleteGuidePage;

  beforeEach(() => {
    page = new AngularCompleteGuidePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
