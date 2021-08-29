export const hideChatActionButtons = function (message, html, data) {
    const card = html.find(".vaesen.chat-card");
    
    console.log(card.attr("data-owner-id"));
    console.log(card.length);
    console.log("hide action buttons")
    if (card.length > 0){
        let user = game.actors.get(card.attr("data-owner-id"));
        console.log(user);
        if ((user && !user.isOwner)){
            const buttons = card.find(".push");
            buttons.each((_i, btn) => {
                btn.style.display = "none"
            });
        }
    }
}