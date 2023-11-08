export class commonListeners {
  static onItemCreate(event, actor) {
    event.preventDefault();
    let header = event.currentTarget;
    let data = duplicate(header.dataset);

    console.log("sheetListener | Item create:", header, actor);
    data["name"] = `New ${data.type.capitalize()}`;
    actor.createEmbeddedDocuments("Item", [data]);
  }

  static onItemUpdate(event, actor) {
    const div = $(event.currentTarget).parents(".item");
    const item = actor.items.get(div.data("itemId"));
    item.sheet.render(true);
  }

  static onItemDelete(event, actor) {
    const div = $(event.currentTarget).parents(".item");
    actor.deleteEmbeddedDocuments("Item", [div.data("itemId")]);
    div.slideUp(200, () => this.render(false));
  }
}
