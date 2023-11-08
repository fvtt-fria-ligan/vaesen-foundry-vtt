
 export function  onItemCreate(ev, actor) {
    ev.preventDefault();
    let header = ev.currentTarget;
    let data = duplicate(header.dataset);

    console.log("sheetListener | Item create:", header, actor);
    data["name"] = `New ${data.type.capitalize()}`;
    actor.createEmbeddedDocuments("Item", [data]);
  }

