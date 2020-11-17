import Peer from "peerjs";

export default class Multiplayer {

  private static CREATED_EVENT = "open";

  private static CONNECTION: Peer | null = null;

  public static createNew(createdCallback: (connection: Peer) => void): void {
    if (this.CONNECTION) {
      console.warn('cannot create new multiplayer connection, a connection already exists');
      return;
    }

    this.CONNECTION = new Peer();
    this.CONNECTION.on(this.CREATED_EVENT, () => createdCallback(this.CONNECTION as Peer));
  }

  public static end(): void {
    if (!this.CONNECTION) {
      return;
    }

    this.CONNECTION.destroy();
    this.CONNECTION = null;
    console.info("disconnected");
  }
}
