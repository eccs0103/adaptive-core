# Adaptive Core

## Information
Core for creating adaptive web pages.\
**Version backward compatibility is NOT supported.**

## Feed
### 2.6.9 (22.03.2024)
- Listener names added.

### 2.6.8 (19.03.2024)
- Added function `Math.sqpw` for fast calculating square power.
- Added functions `String.isEmpty` and `String.replaceVoid`.
- Removed deprecated classes `FastDisplay` and `PreciseDisplay`.

### 2.6.7 (04.03.2024)
- Improved metadata handling.
- Removed deprecated template.
- Enhanced functions `Window.alertAsync`, `Window.confirmAsync`, and `Window.promptAsync`.
- Added functions `Window.warn` and `Window.throw`.
- Function `Window.getDataPath` moved to `Navigator`.
- Added function `Navigator.getVersion` and property `Navigator.colorScheme`.
- Added function `Archive.reset`.
- Improved structure of class `ArchiveManager`.

### Update 2.6.0 (27.02.2024)
- Added `import` and `export` functions for each fundamental class, with the ability to add them to more complex classes.
- Improved error string conversion.
- Fixed element search constructs.
- Added `Element.getClosest` and `Element.tryGetClosest` functions for element searching.
- Added `typename` and `getDataPath` functions to the global namespace.
- Deprecated functions removed.
- Fixed additional functions error in constructors.
- Deprecated type `NotationProgenitor` removed, replaced `NotationContainer` with `ArchiveManager`.
- Improved breakpoint CSS classes.
- Added `avatar` CSS class.

### Update 2.5.2 (12.02.2024)
- Added function `Error.analyze` which analyzes the error and returns a description.
- Added functions `HTMLElement.getElements` and `HTMLElement.tryGetElements` which are counterparts of functions `HTMLElement.getElement` and `HTMLElement.tryGetElement` for multiple elements.
- Added theme `HighContrast`.

### Update 2.5.0 (26.01.2024)
- Added comments with descriptions to all modules.
- `Display` renamed to `FastDisplay`. Added `PreciseDisplay`.
- Class `Random` moved to `Generators.js`.
- Unnecessary fields removed from classes `Point1D`, `Point2D`, `Point3D`.
- Added class `Matrix` to `Measures.js`.
- Classes `Color` and `Texture` moved to `Palette.js`.
- Class `Database` renamed to `Storage` and moved, along with class `Locker`, to `Storage.js`.

### Update 2.4.1 (17.01.2024)
- Added the `Math.between` function.
- Enhanced the program structure.

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