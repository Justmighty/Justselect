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
  var items = document.getElementsByClassName('justselect');

  for (var i = 0; i < items.length; i++)
  {
    items[i].required = true;

    // For mobiles... We need to change our new selectboxes based on values of that old ones
    items[i].onchange = function()
    {
      var target = document.getElementsByClassName('selectbox__label');
      var val = this.value;
      var pairId = this.dataset.sid;
      var opts = this.options;

      // Go through all labels...
      for (a = 0; a < target.length; a++)
      {
        // Find the right one based on pair id
        if (target[a].parentElement.dataset.pair === pairId)
        {
          // Go through all options
          for (b = 0; b < opts.length; b++)
          {
            // Find the right one by its value
            if (opts[b].value == val)
            {
              // Set a text
              target[a].innerHTML = opts[b].innerHTML;
              break;
            }
          }

          break;
        }
      }
    }

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

      // Don't show a disabled option in the list, it's just used in the label and in the original input
      if (!options[j].disabled)
      {
        option.innerHTML = options[j].text;
        wrap.appendChild(option);
        newSelect.appendChild(wrap);
      }
      
    }

    // Insert our new "div select box" after the original select elenent, and then hide that original select.
    // Display overwritten by CSS - this rule doesn't apply in mobile view, there's need to be both of selects shown
    // due to use of an original "scroll select" effect on iPhone and other devices.
    _insertAfter(items[i], newSelect);
    items[i].setAttribute('data-sid', 'select-' + (i+1));
    items[i].style.display = 'none';
  }

  var sel = document.getElementsByClassName('justselect');

  // Wrap selectbox elements, needed to mobile-click works properly
  for (var e = 0; e < sel.length; e++)
  {
    var container = document.createElement("div");
    container.setAttribute('class', 'justwrap');

    var box = document.getElementsByClassName('selectbox');

    sel[e].parentElement.insertBefore(container, sel[e]);
    box[e].parentElement.insertBefore(container, box[e]);
    container.appendChild(sel[e]);
    container.appendChild(box[e]);
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
