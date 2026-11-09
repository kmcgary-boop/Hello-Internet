# Hello-Internet

A personal portfolio for my web development class, retaining my original Home, Projects / Work, and About / Contact content.

**Website:** https://kmcgary-boop.github.io/Hello-Internet/  
**GitHub repository:** https://github.com/kmcgary-boop/Hello-Internet

## Accessibility updates

- I added a skip-to-content link to the About page so keyboard users can bypass repeated navigation.
- I kept my original email button and added a contact form with labels tied to each text field.
- I grouped the contact-reason radio buttons using `fieldset` and `legend` so visitors understand the options.
- I added descriptive field errors and `aria-invalid` states so mistakes are explained with words rather than color alone.
- I used an alert summary that receives keyboard focus after an unsuccessful submission.
- I added visible keyboard-focus outlines to the new form controls.
- I used darker plum text and form accents to improve readability against the light pink design.
- I kept my existing shared `style.css` and added `contact-form.css` solely for the new form.

## Visual design: Gestalt principles

- **Proximity:** I kept related details close together inside the My Story, Skills, and Contact sections, and grouped each contact input with its label and message.
- **Similarity:** My website consistently uses the same pink-and-plum palette, typography, rounded cards, and button styling across my original pages and the new contact form.

## Accessible contact form

The About / Contact page includes a labeled name field, a labeled email field, a contact-reason `fieldset` and `legend`, and a labeled message field. JavaScript checks required fields, displays specific messages next to invalid inputs, and uses `aria-invalid` to mark errors.

The form prepares a `mailto:` email draft; the visitor must review and send the message from their email application. My original **Send Me an Email** button remains available as an alternative.

## WAVE and contrast verification

**Live WAVE scans are still required after publishing.** Do not report zero errors until you run WAVE on each URL and resolve its findings.

| Page | WAVE result |
| --- | --- |
| [Home](https://kmcgary-boop.github.io/Hello-Internet/) | Not yet verified |
| [Projects](https://kmcgary-boop.github.io/Hello-Internet/projects.html) | Not yet verified |
| [About / Contact](https://kmcgary-boop.github.io/Hello-Internet/about.html) | Not yet verified |

Run [WAVE](https://wave.webaim.org/) on all three pages and the [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) on the foreground/background combinations after publishing. Fix all identified errors and record the actual scan results here. The original stylesheet remains unchanged, so this package **does not guarantee WCAG AA contrast everywhere on all three pages**.
