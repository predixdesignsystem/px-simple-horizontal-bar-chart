document.addEventListener("WebComponentsReady", function() {
  runCustomTests();
});

function getElem(comp, tag) {
  return comp.shadowRoot ? comp.shadowRoot.querySelector(tag) : comp.querySelector(tag);
}

function getAllElem(comp, tag) {
  return comp.shadowRoot ? comp.shadowRoot.querySelectorAll(tag) : comp.querySelectorAll(tag);
}

function runCustomTests() {

  // This is the placeholder suite to place custom tests in
  // Use testCase(options) for a more convenient setup of the test cases
  suite('Custom Automation Tests for px-simple-horizontal-bar-chart', function() {
    var fixture1;
    var fixture2;
    var fixture3;
    var fixture4;
    var fixture5;
    var fixture6;

    ////////////////////////////////////////////////////////////////////////////
    /// SUITE SETUP
    ////////////////////////////////////////////////////////////////////////////

    /**
     * Normalizes RGB colors by stripping all whitespaces
     *
     * @param  {String} rgbString - An RGB value like, ex: "rgb(1, 2, 3)"
     * @return {String} - The RGB value with all spaces removed, ex: "rgb(1,2,3)"
     */
    function normalizeRgb(rgbString) {
      return rgbString.toString().replace(/\s+/g, '');
    };

    /**
     * Get normalized RGB fill from a rect found by `svg.querySelectorAll('rect')`
     * at `num` index.
     *
     * @param  {Node} rect - A rectangle found with method like `svg.querySelectorAll('rect')`
     * @param  {Number} num - Index to search
     * @return {String} - An RGB value, ex: "rgb(1,2,3)"
     */
    function getFill(rect, num) {
      var fill = getComputedStyle(rect[num]).fill;

      if (this._colorHexToRgb && (typeof this._colorHexToRgb === "function")) {
        // Attempt to convert value to RGB, if not already RGB
        if ((fill.indexOf('rgb') === -1) && (fill.indexOf('rgba' === -1))) {
          fill = this._colorHexToRgb(fill);
        };
      };

      return normalizeRgb(fill);
    };

    suiteSetup(function(done){
      // Get fixures in DOM for use in tests
      fixture1 = document.getElementById("fixture1");
      fixture2 = document.getElementById("fixture2");
      fixture3 = document.getElementById("fixture3");
      fixture4 = document.getElementById("fixture4");
      fixture5 = document.getElementById("fixture5");
      fixture6 = document.getElementById("fixture6");

      // We wait 2000ms before running any tests to make sure that all fixtures
      // have attached themselves AND finished drawing their charts (which
      // may take a little bit after attached to do SVG operations)
      setTimeout(function(){ done(); }, 2000);
    });

    ////////////////////////////////////////////////////////////////////////////
    /// FIXTURE 1
    ////////////////////////////////////////////////////////////////////////////

    test('[fixture1] Chart has been drawn and is visible', function() {
      assert.equal(getComputedStyle(getElem(fixture1,'rect')).visibility,"visible");
    });

    test('[fixture1] Chart has the correct height (150px)', function() {
      assert.equal(getComputedStyle(getElem(fixture1,'svg')).height,"150px");
    });

    test('[fixture1] SVG element has the default width (285px)', function() {
      assert.equal(getComputedStyle(getElem(fixture1,'svg')).width,"283px");
    });

    test('[fixture1] SVG element has default height (150px)', function() {
      assert.equal(getComputedStyle(getElem(fixture1,'svg')).height,"150px");
    });

    ////////////////////////////////////////////////////////////////////////////
    /// FIXTURE 2
    ////////////////////////////////////////////////////////////////////////////

    test('[fixture2] Chart has the correct height (200px)', function() {
      assert.equal(getComputedStyle(getElem(fixture2,'svg')).height,"200px");
    });

    ////////////////////////////////////////////////////////////////////////////
    /// FIXTURE 3
    ////////////////////////////////////////////////////////////////////////////

    test('[fixture3] SVG element has assigned width', function() {
      assert.equal(getComputedStyle(getElem(fixture3,'svg')).width,"300px");
    });

    test('[fixture3] SVG element has assigned height', function() {
      assert.equal(getComputedStyle(getElem(fixture3,'svg')).height,"200px");
    });

    test('[fixture3] Chart resizes to correct height in fixed-size container', function() {
      document.getElementById('fixture_dimensions').style.height = '270px';
      window.dispatchEvent(new Event('resize'));

      // We wait 1000ms after firing the window-scope resize event to give the
      // chart time to redraw. The chart *should* fire a redrawn event that we
      // listen to and test the result of... but it doesn't for now.
      setTimeout(function(){
        assert.equal(getComputedStyle(getElem(fixture3,'svg')).height,"270px");
      }, 1000);
    });

    test('[fixture3] Chart resizes to correct width in fixed-size container', function() {
      document.getElementById('fixture_dimensions').style.width = '400px';
      window.dispatchEvent(new Event('resize'));

      // We wait 1000ms after firing the window-scope resize event to give the
      // chart time to redraw. The chart *should* fire a redrawn event that we
      // listen to and test the result of... but it doesn't for now.
      setTimeout(function(){
        assert.equal(getComputedStyle(getElem(fixture3,'svg')).width,"400px");
      }, 1000);
    });

    ////////////////////////////////////////////////////////////////////////////
    /// FIXTURE 4
    ////////////////////////////////////////////////////////////////////////////

    test('[fixture4] Number of rectangles drawn the chart is equal to the number of data items passed in', function() {
      var svg = getElem(fixture4,'svg');

      assert.equal(getAllElem(svg, 'rect').length,"10");
    });

    test('[fixture4] Legend was drawn', function() {
      assert.equal(getAllElem(fixture4, 'rect.legend-box').length, '5');
    });

    test('[fixture4] Chart colors match default data vis colors', function() {
      var svg = getElem(fixture4,'svg');
      var rect = getAllElem(svg,'rect');
      var getFillBound = getFill.bind(fixture5);

      // Determine which colors should be set on the chart by calling `_getColor` to retrieve theme, normalize each
      var colors = [
        normalizeRgb(fixture4._getColor(0)),
        normalizeRgb(fixture4._getColor(1)),
        normalizeRgb(fixture4._getColor(2)),
        normalizeRgb(fixture4._getColor(3)),
        normalizeRgb(fixture4._getColor(4))
      ];

      assert.equal(getFillBound(rect, 0), colors[0]);
      assert.equal(getFillBound(rect, 1), colors[1]);
      assert.equal(getFillBound(rect, 2), colors[2]);
      assert.equal(getFillBound(rect, 3), colors[3]);
      assert.equal(getFillBound(rect, 4), colors[4]);
    });

    ////////////////////////////////////////////////////////////////////////////
    /// FIXTURE 5
    ////////////////////////////////////////////////////////////////////////////

    test('[fixture5] Chart colors match applied CSS custom properties', function() {
      var svg = getElem(fixture5,'svg');
      var rect = getAllElem(svg,'rect');
      var getFillBound = getFill.bind(fixture5);

      // Just copy and pasting the RGB values from above into strings to test that
      // the colors the user provides are actually provided, not just that the
      // the internal `_getColor` method returns what it shoudl
      var colors = [
        normalizeRgb('rgb(1,2,3)'),
        normalizeRgb('rgb(4,5,6)'),
        normalizeRgb('rgb(7,8,9)'),
        normalizeRgb('rgb(10,11,12)'),
        normalizeRgb('rgb(255,255,0)')
      ];

      assert.equal(getFillBound(rect, 0), colors[0]);
      assert.equal(getFillBound(rect, 1), colors[1]);
      assert.equal(getFillBound(rect, 2), colors[2]);
      assert.equal(getFillBound(rect, 3), colors[3]);
      assert.equal(getFillBound(rect, 4), colors[4]);
    });

    ////////////////////////////////////////////////////////////////////////////
    /// FIXTURE 6
    ////////////////////////////////////////////////////////////////////////////

    test('[fixture6] Chart colors assigned by attribute override applied CSS custom properties', function() {
      var svg = getElem(fixture6,'svg');
      var rect = getAllElem(svg,'rect');
      var getFillBound = getFill.bind(fixture6);

      // Just copy and pasting the RGB values from above into strings to test that
      // the colors the user provides are actually provided, not just that the
      // the internal `_getColor` method returns what it shoudl
      var colors = [
        normalizeRgb(fixture6._colorHexToRgb('#aaa')),
        normalizeRgb(fixture6._colorHexToRgb('#bbb')),
        normalizeRgb(fixture6._colorHexToRgb('#ccc')),
        normalizeRgb(fixture6._colorHexToRgb('#ddd')),
        normalizeRgb(fixture6._colorHexToRgb('#eee'))
      ];

      assert.equal(getFillBound(rect, 0), colors[0]);
      assert.equal(getFillBound(rect, 1), colors[1]);
      assert.equal(getFillBound(rect, 2), colors[2]);
      assert.equal(getFillBound(rect, 3), colors[3]);
      assert.equal(getFillBound(rect, 4), colors[4]);
    });

  });
};
