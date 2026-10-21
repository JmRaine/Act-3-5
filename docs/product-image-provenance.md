# Original product artwork

Method: built-in OpenAI image-generation tool. Six separate generation requests, with no reference images. The PDF and earlier SVG assets were not used as image inputs. These are fictional sample products for this class project.

Final web assets are saved in `client/public/product-images/` as PNGs. The generated files are resized and compressed for the gallery's 1MB upload limit; their subject matter is not changed.

## Prompt set

Each image uses this shared prompt, with one subject from the table below:

> Use case: product-mockup. Create a new original ecommerce product illustration for a student gallery. Single image, landscape 4:3 composition. Subject: [subject below]. Art direction: beautiful tactile handmade clay / stop-motion miniature aesthetic, softly rounded sculpted forms, subtle clay grain and small handmade imperfections, convincing three-dimensional volume. Object centered on a low sculpted cream display platform against a warm ivory seamless studio backdrop, soft directional sunlight and gentle realistic shadows, restrained sage / terracotta / buttercream palette. Product large and fully visible with generous safe margins, three-quarter catalog view. Premium cohesive miniature product photography, not a flat vector icon. No text, labels, pricing, watermark, collage, people, or border. Do not use any attached PDF or previous image as a reference.

| Output file | Subject |
| --- | --- |
| `mechanical-keyboard.png` | a compact mechanical keyboard with rounded sage green and butter-yellow keycaps, one coral escape key, no printed letters or logos |
| `game-controller.png` | a lavender game controller with coral buttons and deep purple thumbsticks, no lettering or logos |
| `instant-camera.png` | a terracotta instant film camera with a large circular cream lens, tiny viewfinder and a blank photo emerging, no lettering or logos |
| `succulent-planter.png` | a small sculptural jade-green succulent in a peach ceramic pot with an organic scalloped silhouette |
| `cruiser-skateboard.png` | a short cruiser skateboard with a warm maple deck, coral wheels and sage underside, positioned diagonally to show the complete board |
| `everyday-sneakers.png` | a pair of cream low-top sneakers with sage panels, peach accents and chunky soft gum soles, no logos |
