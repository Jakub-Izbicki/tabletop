export default class Element {

  public static from(elId: string): Element {
    const el = document.getElementById(elId);

    return Element.getIfPresent(el);
  }

  private constructor(public isPresent: boolean, private el: HTMLElement | null) {
  }

  public getRect(): DOMRect {
    return this.el?.getBoundingClientRect() as DOMRect;
  }

  public getParent(): Element {
    const parent = this.el?.parentElement;

    return Element.getIfPresent(parent);
  }

  private static getIfPresent(el: HTMLElement | null | undefined) {
    if (el) {
      return new Element(true, el);
    } else {
      return new Element(false, el as null);
    }
  }
}
