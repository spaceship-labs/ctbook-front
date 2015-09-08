describe('contratobook:inicio', function(){

  beforeEach(function(){
    browser.get('/');
  });

  it('should render imgs', function(){
    expect(element.all(by.css('img')).count()).toEqual(11);
  });

});
