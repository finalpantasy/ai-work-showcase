# Snipping Tool UL: capture, mark up, paste

A lightweight Windows screenshot app I build with AI, in Rust. Grabbing an area of the screen to paste into a chat is a small job, and a heavy tool makes it feel bigger. I wanted one that opens instantly and gets out of the way.

I built it on the MIT-licensed [HydroShot foundation](https://github.com/Real-Fruit-Snacks/HydroShot), keeping its license, and reworked the capture flow, the editor and the Windows integration.

![Dark editor preview with a sample image](../assets/snipping/editor-dark.png)

## What it does

Region, window and full-screen capture, with configurable hotkeys and three-, five- and ten-second delays. A capture goes to the clipboard and opens a markup preview in one step.

The editor has pencil, arrows, shapes, highlights, pixelation, text and numbered steps. Any mark can be selected, moved or changed. Deleting a numbered step renumbers the ones after it, and undo restores it.

Saving, OCR, optional history and sharing are there too. History and auto-save are off by default. Uploading an image publicly asks first and shows where it is going and who can see the link. Cancelling or editing the image clears that approval.

![Light editor preview with a sample image](../assets/snipping/editor-light.png)

## Keeping it fast

There is no web view and no constant redraw loop. The app sleeps when nothing needs drawing. The editor keeps the full-resolution original for copy and save, but draws the on-screen preview at window size, so it never does 4K work just to show a smaller picture.

On October 12 I measured the two rendering paths with a synthetic 3840 × 2160 image in a 1410 × 918 editor at 150% scaling:

| Rendering path | Median render time, 21 frames | Image and render buffers held |
| --- | --- | --- |
| Full image | 11.484 ms | 71,532,720 bytes |
| Cached viewport | 4.514 ms | 44,929,008 bytes |
| Difference | 60.7% faster | 37.2% less memory |

[Read the benchmark method and data](../examples/snipping-render-benchmark.md).

## My part

I decide how the app should work and look, build it with AI, and check the details: control labels, live editing, clipboard order, export quality, installation and privacy. The current build is 0.3.6.
