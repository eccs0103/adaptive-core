# Adaptive Webpage Template

## Information
Template for creating adaptive web pages.

## Feed
### Patch 2.4.0 (12.01.2024)
- Added descriptions for `Math.toFactor` and `Math.toSignedFactor`.
- Fixed the ranges of the functions `Math.toFactor` and `Math.toSignedFactor`, which did not include the maximum value in the result.
- Fixed the functions `Math.toDegrees` and `Math.toRadians`, which were working the opposite way.
- Fixed the `Window.load` function that did not close the panel on `promise` rejection.
- Improved styling of `:disabled` objects.

### Update 2.3.8 (08.01.2024)
- Optimization and quality improvement in `Colors.js`, `Executors.js`, `Measures.js`, `Random.js`, `Storage.js`, `Texture.js` and `Time.js`.

### Update 2.3.7 (03.01.2024)
- Optimization and quality improvement in `Measures.js`.

### Update 2.3.6 (24.12.2023)
- Improved modification functions in `Color`.
- Added conversion functions `Math.toDegrees()` and `Math.toRadians()`.
- Improved the structure of measurers `Point`, `Point1D`, `Point2D`, `Point3D`. Added operations `+`, `-`, `*`, `/`.
- Enhanced the constructor in `Texture`.
- Added operations `+`, `-`, `*`, `/` in `Timespan`.

### Update 2.3.4 (10.12.2023)
- Added addition, subtraction, multiplication, division functions to the `Point1D`, `Point2D`, `Point3D` classes.

### Update 2.3.3 (12.11.2023)
- The fast engine has been renamed from `Engine` to `FastEngine`.
- Added the precise engine `PreciseEngine`.
- Improved stylization.

### Update 2.3.2 (05.11.2023)
- Global module work.
- Components `informant.js`, `manager.js`, and `loader.js` have been consolidated into `extensions.js`.
- Component `templates.js` has been split into a directory at `/scripts/modules/templates/`.
- The core has been adapted for imports and exports.

### Update 2.2.6 (15.10.2023)
- Updated modules.
- Added the `Texture` class.

### Update 2.2.5 (14.10.2023)
- Updated modules.

### Update 2.2.4 (07.10.2023)
- Updated console.

### Update 2.2.3 (30.09.2023)
- Updated design of interactive elements.

### Update 2.2.2 (19.09.2023)
- Fixed modifying functions in `Color`.
- Added frame time to `Engine` (see `delta`).
- Added numerous functions to classes `Point`, `Point1D`, `Point2D`, `Point3D`, `Vector<T>`.
- Fixed the `material` theme.

### Update 2.2.0 (12.09.2023)
- Modified styles of the `code` element.
- Updated styles of interactive objects and objects that "pretend" to be interactive.

### Update 2.1.5 (06.09.2023)
- Added `templates.js` component.

### Update 2.1.4 (01.09.2023)
- Updated the `database.js` component.
- Added the ability to reset saves via a link.
- Fixed colors for a more user-friendly appearance in both themes.
- Added interactive background colors.
- Adjusted the size of dividers.

### Update 2.1.0 (26.08.2023)
- Added a timespan component.

### Update 2.0.0 (23.08.2023)
- Modified the default structure (see `/pages/main.html`).
- Added the `integer` function to the `Random` component.
- Improved the `case` function in `Random`.
- Altered the structure of geometric classes (see `/scripts/components/measures.js`).
- Introduced the `Vector` class.
- Rewritten the `Engine` class.
- Rewritten the `Animator` class.
- Consolidated popup window functions into the `Informant` class.
- Rewritten the `Manager` class.
- Added a custom element `ac-panel`.
- Added a loading component.
- Introduced a zero structure (see `/scripts/structure.js`).
- Renamed the CSS class `alert` to `invalid`.
- Enhanced dialog styles.

### Update 1.2.15 (18.08.2023)
- Updated modules.
- Changed design.

### Update 1.2.11 (12.08.2023)
- Styles have been changed.
- A loading module has been added.

### Update 1.2.10 (26.07.2023)
- Modified the `Application` module structure. `Application` has been changed to `Manager`.
- Modified the `Coordinate` module structure. `Coordinate` has been changed to `Point2X`.

### Update 1.2.9 (21.06.2023)
- Added frame rate limiter to the `Engine` module.
- Added the ability to run once in the `Engine` module.
- Added a parameter indicating whether it was started in the `Engine` module.

### Update 1.2.8 (19.06.2023)
- Improved `Archive` module.
- Added `Database` module.

### Update 1.2.5 (16.06.2023)
- Added classes `large-padding`, `large-gap` for spacing control.

### Update 1.2.4 (15.06.2023)
- Information don't exist now.