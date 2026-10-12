# Snipping Tool UL internal rendering benchmark

Measured local development evidence retained October 12, 2026, version 0.3.5. This compares two rendering paths inside UL. It is not a comparison with Microsoft Snipping Tool.

## Method

CPU-only synthetic rendering helper. No application window, desktop capture, clipboard writes or upload. A synthetic 3840 × 2160 image is drawn into a 1410 × 918 editor viewport at 150% DPI. Warm rendering uses the median of 21 samples. The buffer measure totals the retained image and render buffers described by the helper, not process working set or private bytes.

## Retained run

| Measure | Full-image path | Cached viewport path |
| --- | --- | --- |
| CPU render time, warm median | 11.484 ms | 4.514 ms |
| Retained pixel buffers | 71,532,720 bytes | 44,929,008 bytes |

CPU render reduction: (11.484 − 4.514) / 11.484 = 60.7%.

Buffer reduction: (71,532,720 − 44,929,008) / 71,532,720 = 37.2%.

The retained run also records warm viewport render times of 4.077 ms for a 960 × 540 image and 4.027 ms for 1920 × 1080, at the same editor viewport. Each cached case records one image resample.

## What this does and does not establish

It supports the design choice to cache the visible preview rather than redraw the whole original image for every frame. Load and hardware affect timings. It does not measure total application RAM, idle CPU percentage, startup, capture, native presentation or capture-to-clipboard latency. It does not establish a Microsoft-relative speedup.

## Planned matched comparison

Use an isolated Windows session and record app/OS versions, machine, display scaling and image dimensions. Measure the same cold and warm task sequence for both apps. Report working set and private bytes separately. Define timings from activation to visible selection, selection release to clipboard readiness and annotation change to visible frame. Keep user thinking time out of latency. Repeat enough trials to report a distribution rather than one best result. Keep private desktop contents out of test images.
