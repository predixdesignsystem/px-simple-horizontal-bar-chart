// This is the wrapper for custom tests, called upon web components ready state
function runCustomTests() {

  // This is the placeholder suite to place custom tests in
  // Use testCase(options) for a more convenient setup of the test cases
  suite('Custom Automation Tests for px-simple-horizontal-bar-chart', function() {

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
      var fixture1 = document.getElementById("fixture1");
      var fixture2 = document.getElementById("fixture2");
      var fixture3 = document.getElementById("fixture3");
      var fixture4 = document.getElementById("fixture4");
      var fixture5 = document.getElementById("fixture5");
      var fixture6 = document.getElementById("fixture6");

      // We wait 2000ms before running any tests to make sure that all fixtures
      // have attached themselves AND finished drawing their charts (which
      // may take a little bit after attached to do SVG operations)
      setTimeout(function(){ done(); }, 2000);
    });

    ////////////////////////////////////////////////////////////////////////////
    /// FIXTURE 1
    ////////////////////////////////////////////////////////////////////////////

    test('[fixture1] Chart has been drawn and is visible', function(done) {
      assert.equal(getComputedStyle(fixture1.querySelector('rect')).visibility,"visible");
      done();
    });

    test('[fixture1] Chart has the correct height (150px)', function(done) {
      assert.equal(getComputedStyle(fixture1.querySelector('svg')).height,"150px");
      done();
    });

    test('[fixture1] SVG element has the default width (285px)', function(done) {
      assert.equal(getComputedStyle(fixture1.querySelector('svg')).width,"283px");
      done();
    });

    test('[fixture1] SVG element has default height (150px)', function(done) {
      assert.equal(getComputedStyle(fixture1.querySelector('svg')).height,"150px");
      done();
    });

    ////////////////////////////////////////////////////////////////////////////
    /// FIXTURE 2
    ////////////////////////////////////////////////////////////////////////////

    test('[fixture2] Chart has the correct height (200px)', function(done) {
      assert.equal(getComputedStyle(fixture2.querySelector('svg')).height,"200px");
      done();
    });

    ////////////////////////////////////////////////////////////////////////////
    /// FIXTURE 3
    ////////////////////////////////////////////////////////////////////////////

    test('[fixture3] SVG element has assigned width', function(done) {
      assert.equal(getComputedStyle(fixture3.querySelector('svg')).width,"300px");
      done();
    });

    test('[fixture3] SVG element has assigned height', function(done) {
      assert.equal(getComputedStyle(fixture3.querySelector('svg')).height,"200px");
      done();
    });

    test('[fixture3] Chart resizes to correct height in fixed-size container', function(done) {
      document.getElementById('fixture_dimensions').style.height = '270px';
      window.dispatchEvent(new Event('resize'));

      // We wait 1000ms after firing the window-scope resize event to give the
      // chart time to redraw. The chart *should* fire a redrawn event that we
      // listen to and test the result of... but it doesn't for now.
      setTimeout(function(){
        assert.equal(getComputedStyle(fixture3.querySelector('svg')).height,"270px");
        done();
      }, 1000);
    });

    test('[fixture3] Chart resizes to correct width in fixed-size container', function(done) {
      document.getElementById('fixture_dimensions').style.width = '400px';
      window.dispatchEvent(new Event('resize'));

      // We wait 1000ms after firing the window-scope resize event to give the
      // chart time to redraw. The chart *should* fire a redrawn event that we
      // listen to and test the result of... but it doesn't for now.
      setTimeout(function(){
        assert.equal(getComputedStyle(fixture3.querySelector('svg')).width,"400px");
        done();
      }, 1000);
    });

    ////////////////////////////////////////////////////////////////////////////
    /// FIXTURE 4
    ////////////////////////////////////////////////////////////////////////////

    test('[fixture4] Number of rectangles drawn the chart is equal to the number of data items passed in', function(done) {
      var svg = fixture4.querySelector('svg');

      assert.equal(svg.querySelectorAll('rect').length,"10");
      done();
    });

    test('[fixture4] Legend was drawn', function(done) {
      assert.equal(fixture4.querySelectorAll('rect.legend-box').length, '5');
      done();
    });

    test('[fixture4] Chart colors match default data vis colors', function(done) {
      var svg = fixture4.querySelector('svg');
      var rect = svg.querySelectorAll('rect');
      var getFillBound = getFill.bind(fixture5);

      // Determine which colors should be set on the chart by calling `_getColor` to retrieve theme, normalize each
      var colors = [
        normalizeRgb(fixture4._getColor(0)),
        normalizeRgb(fixture4._getColor(1)),
        normalizeRgb(fixture4._getColor(2)),
        normalizeRgb(fixture4._getColor(3)),
        normalizeRgb(fixture4._getColor(4))
      ];

      assert.equal(getFillBound(rect, 0),  colors[0]);
      assert.equal(getFillBound(rect, 1), colors[1]);
      assert.equal(getFillBound(rect, 2), colors[2]);
      assert.equal(getFillBound(rect, 3), colors[3]);
      assert.equal(getFillBound(rect, 4), colors[4]);
      done();
    });

    ////////////////////////////////////////////////////////////////////////////
    /// FIXTURE 5
    ////////////////////////////////////////////////////////////////////////////

    test('[fixture5] Chart colors match applied CSS custom properties', function(done) {
      debugger;
      var svg = fixture5.querySelector('svg');
      var rect = svg.querySelectorAll('rect');
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

      assert.equal(getFillBound(rect, 0),  colors[0]);
      assert.equal(getFillBound(rect, 1), colors[1]);
      assert.equal(getFillBound(rect, 2), colors[2]);
      assert.equal(getFillBound(rect, 3), colors[3]);
      assert.equal(getFillBound(rect, 4), colors[4]);
      done();
    });

    ////////////////////////////////////////////////////////////////////////////
    /// FIXTURE 6
    ////////////////////////////////////////////////////////////////////////////

    test('[fixture6] Chart colors assigned by attribute override applied CSS custom properties', function(done) {
      var svg = fixture6.querySelector('svg');
      var rect = svg.querySelectorAll('rect');
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

      assert.equal(getFillBound(rect, 0),  colors[0]);
      assert.equal(getFillBound(rect, 1), colors[1]);
      assert.equal(getFillBound(rect, 2), colors[2]);
      assert.equal(getFillBound(rect, 3), colors[3]);
      assert.equal(getFillBound(rect, 4), colors[4]);
      done();
    });

  });
};
