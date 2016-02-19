var expect = require('chai').expect;
var m = require('mithril');
var a = require('../src/mithril-armor');

describe('Composition', function() {

  describe('Constructing non-void elements', function() {
    it("a(tag) returns extendable function", function() {
      expect(a('div')).to.be.a('function');
    });

    it("a(tag, attrs) returns extendable function", function() {
      expect(a('div', {class: 'test'})).to.be.a('function');
    });

    it("a(tag, attrs, children) returns mithril object", function() {

      var aObj = a('div', {class: 'test'}, []);
      var mObj = m('div', {class: 'test'}, []);
      expect(aObj).to.eql(mObj);
    });

    it("a(tag)(attrs)(children) returns mithril object", function() {
      var aObj = a('div')({class: 'test'})('content');
      var mObj = m('div', {class: 'test'}, 'content');
      expect(aObj).to.eql(mObj);
    });

    it("a(className) returns extendable function with div as tag", function(){
      var aObj = a('.container');
      var fObj = aObj({}, []);

      expect(aObj).to.be.a('function');
      expect(fObj.tag).to.equal('div');
      expect(fObj.attrs.className).to.equal('container');
    })

    it("a(className) return fn can handle array.map for children", function() {
      var arr = [1,2,3,4,5];
      var button = a('button');
      var container = a('.container');
      var aObj = container(arr.map(function(element){
        return button(element);
      }));

      var mObj = m('.container', arr.map(function(element) {
        return m('button', element);
      }))


      expect(aObj).to.eql(mObj);


    })

    describe('extending non-void armor elements', function() {
      var container = a('div'),
          button = a('button');

      it('assuming var container = a("div")', function() { return true; })

      it('container("content") should be a div with child "content"', function(){
        var aObj = container('content');
        var mObj = m('div', 'content');
        expect(aObj).to.eql(mObj);
      })

      it('container([]) should be an empty div mithril object', function(){
        var aObj = container([]);
        var mObj = m('div', []);
        expect(aObj).to.eql(mObj);
      })

      it('container({})("content") should be a div mithril object with child content', function(){
        var aObj = container({})("content");
        var mObj = m('div', "content");
        expect(aObj).to.eql(mObj);
      })

      it('assuming var button = a("button")', function() { return true; })

      it('button("content") should be a button with text "content"', function(){
        var aObj = button('content');
        var mObj = m('button', 'content');
        expect(aObj).to.eql(mObj);
      })

      it('button({class: "danger"}) should be an extendable function', function(){
        var aObj = button({class: "danger"});
        var mObj = m('button', 'content');
        expect(aObj).to.be.a('function');
      })

      it('button({class: "danger"})("content") should be a mithril object with child content and class danger', function(){
        var aObj = button({class: "danger"})("content");
        var mObj = m('button', {class: "danger"}, 'content');
        expect(aObj).to.eql(mObj);
      })

    });

  })

  describe('Constructing void elements', function() {

    it("a(tag) returns extendable function", function() {
      expect(a('input')).to.be.a('function');
    });

    it("a(tag, attrs) returns mithril object", function() {

      var aObj = a('input', {type: 'text'});
      var mObj = m('input', {type: 'text'});
      expect(aObj).to.eql(mObj);
    });

    it("a(tag)(attrs) returns mithril object", function() {
      var aObj = a('input')({type: 'text'});
      var mObj = m('input', {type: 'text'});
      expect(aObj).to.eql(mObj);
    })

    describe('extending void armor elements', function() {

      var input = a('input');
      var image = a('img');

      it('assuming var input = a("input")', function(){return true});

      it('input({type: text}) should yield mithril text input', function() {
        var aObj = input({type: 'text'});
        var mObj = m('input', {type: 'text'});
        expect(aObj).to.eql(mObj);
      });

      it('input({type: text}) should yield mithril checkbox input', function() {
        var aObj = input({type: 'text'});
        var mObj = m('input', {type: 'text'});
        expect(aObj).to.eql(mObj);
      });

      it('input({type: text}) should yield mithril submit input', function() {
        var aObj = input({type: 'text'});
        var mObj = m('input', {type: 'text'});
        expect(aObj).to.eql(mObj);
      })

      it('assuming var image = a("image")', function(){return true});

      it('image({src: "fakepath"}) should yield an img tag with src "fakepath"', function() {
        var aObj = image({src: 'fakepath'});
        var mObj = m('img', {src: 'fakepath'});
        expect(aObj).to.eql(mObj);
      })

      it('image({}) should yield a blank img tag ', function() {
        var aObj = image({});
        var mObj = m('img');
        expect(aObj).to.eql(mObj);
      })

    });

  })


});
