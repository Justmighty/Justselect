// Document ready...
document.addEventListener("DOMContentLoaded", function(event) {

  // Helper functions
  function _insertAfter(_ref, _new)
  {
    _ref.parentNode.insertBefore(_new, _ref.nextSibling);
  }

  function _hasClass(el, cls)
  {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }

  // Close selectbox if clicked elsewhere...
  window.onclick = function()
  {
    var _q = document.getElementsByClassName('selectbox-options');

    for (var q = 0; q < _q.length; q++)
    {
      _q[q].setAttribute('class', 'selectbox-options selectbox-options--hidden');
    }
  }

  // Target select boxes
  var items = document.getElementsByTagName('select');

  for (var i = 0; i < items.length; i++)
  {
    // Get all <option> from each selectbox
    var options = items[i].options;

    var newSelect = document.createElement('div');
    newSelect.setAttribute('class', 'selectbox');
    // Add a data-pair attribute for a new selectbox so we can pair options values
    // from the original one and this new one together - we need to know which
    // selectbox was clicked/changed.
    newSelect.setAttribute('data-pair', 'select-' + (i+1));

    var label = document.createElement('div');
    label.setAttribute('class', 'selectbox__label');
    newSelect.appendChild(label);

    var wrap = document.createElement('div');
    wrap.setAttribute('class', 'selectbox-options selectbox-options--hidden');

    // Grab option values into our new dropdown
    for (var j = 0; j < options.length; j++)
    {
      var option = document.createElement('div');
      option.setAttribute('class', 'selectbox__option');
      option.setAttribute('data-value', options[j].value);

      // Is option selected?
      if (options[j].selected === true)
      {
        option.setAttribute('class', option.className + ' selectbox__option--selected');
        // Set a selected option's text into the label
        label.innerHTML = options[j].text;
      }

      option.innerHTML = options[j].text;
      wrap.appendChild(option);
      newSelect.appendChild(wrap);
    }

    // Insert our new "div select box" after the original select elenent, and then hide that original select.
    _insertAfter(items[i], newSelect);
    items[i].setAttribute('data-sid', 'select-' + (i+1));
    items[i].style.display = 'none';
  }

  // Dropdown function
  var _label = document.getElementsByClassName('selectbox__label');

  for (var k = 0; k < _label.length; k++)
  {
    _label[k].onclick = function(event)
    {
      // Don't close selectbox if user clicks on it
      event.stopPropagation();

      var _this = this;
      var _options = this.nextSibling;
      var _option = _options.children;

      // Should it be shown or hidden after this click?
      if (_hasClass(_options, 'selectbox-options--hidden'))
        _options.setAttribute('class', 'selectbox-options');
      else
        _options.setAttribute('class', 'selectbox-options selectbox-options--hidden');

      // Clickable options
      for (var o = 0; o < _option.length; o++)
      {
        _option[o].onclick = function()
        {
          // Unset selected class
          for (var s = 0; s < _option.length; s++)
          {
            if (s != o)
              _option[s].setAttribute('class', 'selectbox__option');
          }

          // Change label and set a new selected class for current item
          _this.innerHTML = this.innerHTML;
          this.setAttribute('class', 'selectbox__option selectbox__option--selected');

          // Set selected value to the original selectbox
          var sel = document.querySelectorAll('[data-sid="'+_this.parentElement.dataset.pair+'"]');
          sel[0].value = this.dataset.value;

          // Close the box
          _options.setAttribute('class', 'selectbox-options selectbox-options--hidden');

        }
      }

    }
  }

});
