# Reportal List component

### `.reportal-dropdown`

`reportal-dropdown.css` contains styles (compatible with IE9+) to restyle the `<select>` element. A Reportal Dropdown component needs to be wrapped with an element with `.reportal-dropdown` class and may have a preceding `<label>` 

Example:

      <span class="reportal-dropdown">
        <label>Fancy label</label>
        <select>
          <option>Apples</option>
          <option selected>Pineapples</option>
          <option>Chocolate</option>
          <option>Pancakes</option>
        </select>
      </span>

In Reportal Page editor it looks like this:

      <span class="reportal-dropdown">
        <label>
          <confirmit:wysiwygcomponent type="LanguageText" id="3e6994d6-53de-46f6-b128-4ae2cf88ccbb" />
        </label>
        <confirmit:wysiwygcomponent type="ReportalDropDown" id="c9759ce9-b33e-4989-a079-e31af7c2e5e1" />
      </span>

### Checkbox && Radio

These will inherit styles globally (from `reportal-checkbox-radio.css`) and do not need to be wrapped.
