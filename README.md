# Adaptive Core

## Information
Core for creating adaptive web pages.\
**Version backward compatibility is NOT supported.**

## Feed
### 3.3.6 (30.01.2025)
- Improved controller structure.
- Fixed the operation of the `StaticEngine` and moved it to [workers](./scripts/workers/generators.mjs).
- Optimized the `Color` class.
- Added extensions `array.resize`, `number.modulate`.
- Added functions `Math.meanArithmetic`, `Math.meanGeometric`, `Math.meanHarmonic`.

### 3.3.1 (28.12.2024)
- Added class `Timer`.
- Minor code improvements.

### 3.3.0 (19.12.2024)
- The core is now adapted for Node and Workers.
- Added `matrix.change`, `matrix.forEach`.
- Introduced filters: `color.redEmphasis`, `color.greenEmphasis`, `color.blueEmphasis`, and `texture.greenEmphasis`, `texture.blueEmphasis`.
- Optimized application of effects on textures.
- Minor style improvements.

### 3.2.0 (07.12.2024)
- Added `promise.fulfilled`, `promise.value`, and `promise.reason`.
- Introduced the `.large-image` class.
- Fixed inheritance issues with `EventTarget`.
- Improved `random.boolean`.
- Added a preliminary `SocketManager` class.

### 3.1.6 (28.10.2024)
- Updated template section.
- Global functions divided.
- Removed `function.import`, `function.export`, `Promise.fulfill`, `window.warn`, `window.throw`.
- Improved and renamed functions `parentNode.tryGetElement`, `parentNode.tryGetElements`, `parentNode.tryGetClosest`.
- Accelerated custom dialog windows.
- Fixed delays associated with `Promise.withTimeout` and `Promise.withSignal`.
- Added `PromiseFactory` class.
- Fixed `Error.from` for incomplete exceptions.
- Fixed minor bugs.

### 3.1.1 (17.10.2024)
- Added function `Function.getPrototypeOf`.
- Removed function `window.insure`.
- Fixed minor bugs.
- Improved `Object.map` functionality.

### 3.1.0 (12.10.2024)
- Added `PrimitivesHintMap` for overriding `Symbol.toPrimitive`.
- Added `string.reverse` for quick reversal.
- Removed deprecated `diagnostics.js`.
- `Object.enforce` renamed to a more appropriate `Object.suppress`.
- Fixed an issue in the OOP class `Engine` that caused its events not to display.
- Introduced method overloading.
- Classes `Point`, `Point1D`, `Point2D`, and `Point3D` replaced with more advanced `Vector`, `Vector1D`, `Vector2D`, and `Vector3D`.
- Added overloads and operators for `Timespan`.
- Improved controller structure.
- Enhanced description of `Symbol.toPrimitive` for `Timespan`.
- Accelerated color conversion to HEX string.
- Added overloads for `Color`.
- Fixed errors in `Texture` conversion.

### 3.0.14 (05.10.2024)
- Added extensions `number.orDefault`, `String.empty`, `String.isWhitespace`, `string.orDefault`, `string.toTitleCase`, `string.toLocalTitleCase`, `Object.enforce`, `array.swap`.
- Extension `Function.checkImplementation` renamed to `ensureImplementation`.
- `Array.sequence` will now convert to integer arguments.
- `random.shuffle` accelerated with new extensions.

### 3.0.11 (18.09.2024)
- `Error.generate` renamed to `Error.from`.
- Added `StaticEngine` class.
- Added `random.sequence` function.

### 3.0.9 (12.09.2024)
- Added `Array.sequence` function.
- Added `document.loadImages` function and description for `document.loadImage`.
- Improved `Analyser.benchmark` function.
- Enhanced `Stopwatch` class and `Promise.withTimeout` function for small values.

### 3.0.7 (05.09.2024)
- Removed `window.catch` function.
- Improved `window.assert` and `window.insure` functions.

### 3.0.6 (03.09.2024)
- Fixed the name of the function `document.loadResource`.
- Added `ImplementationError` class for explicit indication of implementation issues.
- Introduced abstract (`Engine`, `Point`) and sealed (`ImplementationError`) classes.
- Fixed nested class structures, enabling more embedded classes.
- Simplified the program entry point.
- Add `.flex.reversed` css-class.

### 3.0.1 (20.07.2024)
- Added `Math.split` function.
- Added `Function.isImplemented` and `Function.checkImplementation` functions.

### 3.0.0 (09.07.2024)
- Added module [diagnostics.js](./scripts/modules/diagnostics.js) with the `Analyser` class.
- Improved code structure using the latest functions.
- Fixed execution delays in `Promise.withTimeout` and `Promise.withSignal`.
- Renamed `window.ensure` to `window.assert` for a clear distinction from `window.insure`.
- Optimized and improved the `window.load` function.
- Optimized `VersionManager.parse`.
- `fastEngine.limit` now simply ignores incorrect values.
- `preciseEngine.limit` now simply ignores incorrect values.
- Removed redundant static functions in `Point1D`, `Point2D`, `Point3D` classes.
- Added methods `Point1D.parse`, `Point2D.parse`, `Point3D.parse`, `point1D.map`, `point2D.map`, `point3D.map`.
- Renamed `Point1D.repeat`, `Point2D.repeat`, `Point3D.repeat` to `Point1D.fill`, `Point2D.fill`, `Point3D.fill`.
- Fixed and optimized the `Timespan.parse` method.
- `Timespan` now supports going beyond allowed ranges and will self-correct.
- Removed redundant static functions in the `Timespan` class.
- `Timespan` properties now simply ignore incorrect values.
- Fixed `Timespan` conversion to primitive.
- Non-static `Timespan` modifiers now modify the instance itself to optimize memory usage.
- Added `Stopwatch` class for measuring time intervals.
- Added descriptions for `ColorFormats`.
- Improved and optimized functions for converting between color types.
- Removed redundant static functions in the `Color` class.
- Improved and optimized color conversion to and from strings.
- `Color` now supports going beyond allowed ranges and will self-correct.
- Non-static `Color` modifiers now modify the instance itself to optimize memory usage.
- Fixed and accelerated `ImageData` to `Texture` conversion function.
- Optimized texture cloning.
- Non-static `Texture` modifiers now modify the instance itself to optimize memory usage.
- Improved `ArchiveManager` class.
- Created `ArchivableInstance` and `ArchivablePrototype` interfaces for working with it.
- Fully fixed and restored `Database` and `Store` classes for autonomous browser database work.
- Moved `Store` class into `Database` as a nested class.
- Improved controller structure.

### 2.8.9 (25.06.2024)
- Added `document.loadResource`.
- Removed deprecated `location.mapSearch`.
- Added functions `Point.isNaN`, `Point.isFinite`, `Point.isInteger`, and `Point.isSafeInteger`.

### 2.8.8 (23.06.2024)
- Improved and optimized template scripts.
- Enhanced core structure.
- Added `Promise.withTimeout` function.

### 2.8.7 (11.06.2024)
- `Math.between` renamed to `number.clamp`.
- Added function `random.shuffle`.
- `Time` moved to [measures.js](./scripts/modules/measures.js).

### 2.8.6 (27.05.2024)
- Added `number.interpolate` function.
- Removed deprecated `Math.toFactor` and `Math.toSignedFactor` functions.
- Functions `getElement`, `tryGetElement`, `getElements`, `tryGetElements` moved to `ParentNode` for broader use.
- Improved structure of the [material.css](./styles/themes/material.css) theme.

### 2.8.3 (21.05.2024)
- Added method `Promise.withSignal` for convenient handling of one-time handlers.
- Added method `window.insure`. Handled method `window.ensure`.
- Refactored `Random` class. Added global instance `Random.global`.
- Added method `random.subarray`.
- Added error handling in `Matrix` class.

### 2.8.0 (11.05.2024)
- Added `NAN`, `CONSTANT_NAN` to `Point1D`, `Point2D`, `Point3D` classes.
- Deprecated functions removed.
- Engines moved to `generators.js`.
- Enhancements made to `Navigator` and `Location`.
- CSS styles converted to nested styles.

### 2.7.5 (08.05.2024)
- Added preloading for loading animation.
- Changed loading animation.
- Fixed `change` events in `FastEngine` and `PreciseEngine`.
- Added class `DataPair`.
- Deprecated styles removed.

### 2.7.2 (04.05.2024)
- Added classes `Stack<T>`, `Queue<T>`, `StrictMap<K, V>`.
- Added function `Random.boolean`.
- Added functions `Point1D.getDistanceBetween`, `Point2D.getDistanceBetween`, `Point3D.getDistanceBetween`.

### 2.6.11 (13.04.2024)
- Added `CONSTANT_ZERO`, `SINGLE`, `CONSTANT_SINGLE`, `DOUBLE`, `CONSTANT_DOUBLE` to `Point1D`, `Point2D`, `Point3D` classes.
- Engines optimized.
- Unstable classes for databases frozen.

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
