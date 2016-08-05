# Reportal List component

### Common styles

Reportal components wrapped with an element with `reportal-select` (or `reportal-select multiple` for multiselect), `reportal-checkbox`, `reportal-radio`, `reportal-input`, `reportal-datepicker` classes
will have a margin (`8px[default]` otherwise configure via `--reportal-list-margin` variable in `variables.css`) on the sides and the bottom. Besides if the wrapping element contains a `<label>`, it'll be placed above the component and styled accordingly.
All common styles are in `common-styles.css`.

## `.reportal-select`

`reportal-select.css` contains styles (compatible with IE9+) to restyle the `<select>` element. A Reportal List (dropdown/list) component needs to be wrapped with an element with `reportal-select` or `reportal-select multiple` (for multiselect) class and may have a preceding `<label>` 

Example:

      <span class="reportal-select">
        <label>Fancy label</label>
        <span class="reportal_hide_print">
          <select>
            <option>Apples</option>
            <option selected>Pineapples</option>
            <option>Chocolate</option>
            <option>Pancakes</option>
          </select>
        <span>
      </span>

In Reportal Page editor it looks like this:

      <span class="reportal-select">
        <label>
          <confirmit:wysiwygcomponent type="LanguageText" id="3e6994d6-53de-46f6-b128-4ae2cf88ccbb" />
        </label>
        <confirmit:wysiwygcomponent type="ReportalDropDown" id="c9759ce9-b33e-4989-a079-e31af7c2e5e1" />
      </span>

### Checkbox && Radio

These will inherit styles globally (from `reportal-checkbox-radio.css`) and do not need to be wrapped.
