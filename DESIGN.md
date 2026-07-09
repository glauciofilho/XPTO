---
name: Data Synthesis System
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#45464d'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#855300'
  on-secondary: '#ffffff'
  secondary-container: '#fea619'
  on-secondary-container: '#684000'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#0d1c2f'
  on-tertiary-container: '#76859b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#d5e3fd'
  tertiary-fixed-dim: '#b9c7e0'
  on-tertiary-fixed: '#0d1c2f'
  on-tertiary-fixed-variant: '#3a485c'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  mono-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-padding: 64px
  gutter: 24px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  stack-xl: 64px
---

## Brand & Style

This design system is engineered for technical clarity and high-density information architecture. It targets data engineers, analysts, and enterprise stakeholders who require precision over flourish. The personality is authoritative, systematic, and transparent.

The aesthetic follows a **Modern Corporate/Technical** movement. It prioritizes functional minimalism, utilizing expansive whitespace to reduce cognitive load during complex data presentations. Visual elements are strictly flat and structural, avoiding any decorative gradients, blurs, or skeuomorphism to ensure the data remains the focal point.

## Colors

The palette is anchored by a high-contrast relationship between the background and primary text to ensure maximum legibility.

- **Primary (#0F172A):** A deep navy used for headlines, primary navigation, and structural dividers. It provides a sense of stability and institutional trust.
- **Secondary (#F59E0B):** A vibrant amber used sparingly for critical call-outs, status indicators, and subtle icon highlights. It acts as a surgical tool to draw attention.
- **Tertiary (#334155):** A slate gray used for secondary text, metadata, and inactive states.
- **Neutral (#F9FAFB):** A clinical off-white used for the canvas to prevent eye strain while maintaining a crisp, modern feel.

## Typography

The typography uses **Inter** for its exceptional legibility and neutral, systematic character. For technical data snippets or code blocks, a secondary monospaced font is introduced to provide a clear visual distinction between natural language and technical input.

- **Scale:** High contrast between display titles and body text to facilitate quick scanning of slides.
- **Weight:** Medium and Semi-bold weights are used for semantic hierarchy rather than color shifts.
- **Tracking:** Tightened slightly for larger headings to maintain a modern, "locked-in" appearance.

## Layout & Spacing

The system is optimized for a **16:9 widescreen fixed grid**, typical of professional presentations and enterprise dashboards. 

- **Grid:** A 12-column grid with 24px gutters. Content should typically span 4, 6, or 8 columns to maintain balance.
- **Margins:** A generous 64px "safe zone" is enforced on all sides of the canvas to ensure content remains professional and uncrowded.
- **Rhythm:** An 8px linear scale governs all vertical spacing. Elements are grouped using tight 8px or 16px gaps, while major sections are separated by 64px gaps.

## Elevation & Depth

This design system utilizes **Low-contrast outlines** instead of shadows to define hierarchy. 

- **Surfaces:** Depth is communicated through tonal layering. For example, a "card" is simply a white container with a 1px border (#E2E8F0) against the #F9FAFB background. 
- **Separators:** Use thin, 1px horizontal lines in #E2E8F0 to divide sections within a page.
- **Interactive States:** Subtle shifts in background color (e.g., from #FFFFFF to #F1F5F9) indicate hover states, rather than lifting the element with shadows.

## Shapes

The shape language is conservative and geometric. 

- **Corners:** A "Soft" radius (4px to 8px) is applied to buttons and containers to keep the UI from feeling aggressive while maintaining a serious, professional tone. 
- **Icons:** Use 2px stroke-width line icons. Icons must be strictly geometric and non-illustrative.
- **Buttons:** Rectangular with minimal rounding (4px) to reinforce the technical nature of the system.

## Components

- **Buttons:** Primary buttons use a solid #0F172A background with white text. Secondary buttons use a 1px #0F172A border with no fill.
- **Data Tables:** High-density layout with 1px #E2E8F0 horizontal borders only. Header cells should use `label-md` with #334155 text.
- **Chips/Badges:** Small, rectangular containers with a 4px radius. Use #F1F5F9 backgrounds for general tags and #FEF3C7 (light amber) for highlighted statuses.
- **Input Fields:** 1px border (#CBD5E1). On focus, the border shifts to #0F172A. No inner shadows.
- **Progress Bars:** Use a thin 4px height. The track is #E2E8F0 and the indicator is #F59E0B.
- **Code Blocks:** A specialized container using #1E293B background and monospaced typography for technical documentation and query examples.