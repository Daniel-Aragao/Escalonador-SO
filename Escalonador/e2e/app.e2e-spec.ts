import { EscalonadorPage } from './app.po';

describe('escalonador App', function() {
  let page: EscalonadorPage;

  beforeEach(() => {
    page = new EscalonadorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
