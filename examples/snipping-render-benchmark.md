# Snipping Tool UL: editor rendering results

Internal performance comparison, October 12, 2026, version 0.3.5. Full-image rendering versus cached viewport rendering.

## Method

Render a 3840 × 2160 sample image into a 1410 × 918 editor viewport at 150% DPI. CPU rendering time is the warm median of 21 samples. The memory measure totals retained image and rendering buffers.

| Measurement | Full-image path | Cached viewport path | Improvement |
| --- | --- | --- | --- |
| Warm CPU rendering time | 11.484 ms | 4.514 ms | 60.7% reduction |
| Retained image-buffer bytes | 71,532,720 | 44,929,008 | 37.2% reduction |

The cached viewport draws the visible preview at the editor’s size while retaining the original image for full-resolution export. Each cached case records one image resample.

## Calculation

CPU rendering: (11.484 − 4.514) / 11.484 = 60.7%.

Image buffers: (71,532,720 − 44,929,008) / 71,532,720 = 37.2%.

At the same viewport, warm cached rendering took 4.077 ms for a 960 × 540 image and 4.027 ms for a 1920 × 1080 image.

## Product decision

Cache the preview at the size people see it. Keep the original pixels available for copy and save. This connects a cheaper rendering path with a full-quality output.
