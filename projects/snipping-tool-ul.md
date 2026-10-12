# Snipping Tool UL: a small tool for a daily task

Native Windows screenshot app built with Rust. Product design, AI-assisted development and performance optimization.

I wanted a screenshot tool that feels light and gets out of the way. The task is common: select an area, paste it into a chat, add a mark when needed and get back to work. Waiting on a heavy interface makes that small task feel bigger than it should.

I built Snipping Tool UL on the MIT-licensed [HydroShot foundation](https://github.com/Real-Fruit-Snacks/HydroShot), extending the workflow, editor and Windows integration around the way I use screenshots at work.

## Keep the useful features

The app includes region, window and full-screen capture, configurable hotkeys and three-, five- and ten-second delays. The capture workflow pairs clipboard copy with an annotation preview, keeping the common next steps together.

The editor includes pencil strokes, arrows, shapes, highlights, pixelation, text and numbered steps. Width and size controls are visible. Selecting a mark lets you move or change it; deleting a numbered step renumbers the later steps, and undo restores the change.

There is also saving, OCR, optional history and sharing. History and auto-save are off by default. Sharing is a deliberate action, with a clear confirmation before an image is uploaded publicly.

The 0.3.6 build adds an explicit “Upload publicly” confirmation showing the destination and link visibility. Cancelling or changing the image clears approval. Repeated requests can reuse a small in-memory cache of successful links instead of uploading the same image again.

Saving also has practical safeguards. Auto-save creates a chosen missing folder and preserves files when timestamps collide. Manual Save asks for a destination before flattening or encoding the image, so cancelling avoids that work. Encoding runs on a worker after selection. This keeps expensive image processing off the main interface and avoids unnecessary work when a person cancels.

## Make lightness a design choice

The app uses no webview or permanent rendering loop. Its event loop can sleep when no work needs drawing. Icon assets are prepared ahead of time rather than parsed on every interaction.

The editor keeps the original image for export while drawing the visible preview at the window's size. That avoids repeatedly doing full-resolution work just to show a smaller view. Copy and save use the original resolution separately.

This is where product and performance meet. A fast preview should still produce a sharp export. Making the preview cheaper should not quietly lower the quality of the file a person saves or pastes.

## The interface

![Dark editor preview with a sample image](../assets/snipping/editor-dark.png)

![Light editor preview with a sample image](../assets/snipping/editor-light.png)

The editor previews show the app’s light and dark themes using a sample image.

The interface uses restrained teal controls, light and dark themes, a frosted workspace and clear tool names. The image stays sharp and opaque inside the surrounding workspace. The supplied bird-and-scissors identity gives the small app a recognizable visual character.

## Less work for the preview, full quality for the export

The retained October 12 version 0.3.5 benchmark compared two rendering paths inside the app, using a synthetic 3840 × 2160 image and a 1410 × 918 editor viewport at 150% DPI.

| Internal rendering path | Warm CPU render time, median of 21 frames | Retained image and render buffers |
| --- | --- | --- |
| Full-image path | 11.484 ms | 71,532,720 bytes |
| Cached viewport path | 4.514 ms | 44,929,008 bytes |
| Difference | 60.7% less CPU render time | 37.2% fewer retained buffer bytes |

The comparison measures editor rendering and retained image buffers. Caching the viewport makes the preview cheaper to draw while preserving the full-resolution original for copy and export.

[Read the benchmark method and data](../examples/snipping-render-benchmark.md).

## My contribution

I define the workflow and the visual direction, work with AI on the build and insist that performance and usability stay connected. That includes clear controls, live annotation editing, clipboard ordering, accurate exports, installation behavior and privacy checks.

The app demonstrates a practical kind of AI-assisted building: start with a daily frustration, use an appropriate foundation, preserve its license, make the experience better and check the result. The native executable, event-driven interface and cached preview all serve the same goal: keep a frequent task simple and lightweight.

The work brings together product judgment, interaction design, AI-assisted implementation and performance tuning. I can move from a daily frustration to a concrete tool, then improve the details that make it useful.
