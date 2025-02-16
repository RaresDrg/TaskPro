import icons from "../assets/icons/icons.svg";

/**
 * Renders an SVG icon from a sprite sheet.
 *
 * @param name - The name of the icon to be rendered. This should match the ID of the icon in the sprite sheet.
 * @param className - An optional class name to be applied to the SVG element for styling purposes.
 * @returns The SVG element representing the icon.
 */

export function renderIcon(name: string, className?: string) {
  return (
    <svg className={className}>
      <use href={`${icons}#${name}`}></use>
    </svg>
  );
}
