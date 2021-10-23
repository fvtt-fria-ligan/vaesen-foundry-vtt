# Vaesen
The **OFFICIAL** system for playing Vaesen on Foundry VTT.  
This system provides character sheets and items for  your play, if you would like to have tables and other pre-made official contnent check out the offical core ruleset Module
    - https://freeleaguepublishing.com/en/store/?product_id=7092046200981

## Install
1. Go to the setup page and choose **Game Systems**.
2. Click the **Install System** button, and search for Vaesen, click the Install button.
3. Create a Game World using the Vaesen system.

## Preview
![Character 1](https://github.com/fvtt-fria-ligan/vaesen-foundry-vtt/blob/master/asset/screen_shot.png?raw=true)  
![Character 1](https://github.com/fvtt-fria-ligan/vaesen-foundry-vtt/blob/master/asset/player_update.png?raw=true)  
![Character 1](https://github.com/fvtt-fria-ligan/vaesen-foundry-vtt/blob/master/asset/npc.png?raw=true)  
![Character 1](https://github.com/fvtt-fria-ligan/vaesen-foundry-vtt/blob/master/asset/vaesen.png?raw=true)  
![Character 1](https://github.com/fvtt-fria-ligan/vaesen-foundry-vtt/blob/master/asset/headquarter.png?raw=true)    

## To be done in the nearest future

* Dialogs
    * line up ux and design to match overall look and feel
    * potentially move roll dialog to a FormApp to allow for more robust dice pool builiding 

* Link conditions on sheet and status icons on the character sheet (adding a status from the token toggels it on the sheet and visa versa)

* CSS optimization - convert current CSS structure to LESS based pre-processor for future ease of adjustment
    - underway

## Related Website
- https://foundryvtt.com/
- https://frialigan.se/en/store/?collection_id=205381763221

## Licence
[GNU General Public License v3.0](https://choosealicense.com/licenses/gpl-3.0/)

## Release Notes

v2.2.17
- Finally (fingers crossed) squished the css graphical glitch on headers
- verified v9 compatibility for v9 224
- updated spanish localization

v2.2.16
- BUGFIX: [#24 Chat Display Defaults all Weapons to "Close Combat"](https://github.com/fvtt-fria-ligan/vaesen-foundry-vtt/issues/24)


v2.2.15
- Mac font size adjustment on character sheet


v2.2.14 
- blind and gm rolls now hide the token portrait in the chat log from non-gm players to help preserve the mystery of who, or what is making a given roll!. [#19](https://github.com/fvtt-fria-ligan/vaesen-foundry-vtt/issues/19)
- Continued work on moving css into less progress is about 20% at this point.  


v2.2.13
- Spanish Localization updated to include all new strings! 
- ¡Se actualizó la localización en español para incluir todas las cadenas nuevas!

v2.2.12
- bug fix - stretched icons for items on combat, talent and gear tabs for actors
      - this fixes [#20](https://github.com/fvtt-fria-ligan/vaesen-foundry-vtt/issues/20)

v2.2.9
- breakout of actor elements in css for Less conversion

v2.2.7
- header adjustments

v2.2.6 
- Continued work on css refactoring
- Improvements to CSS for offical content layouts and glitches

v2.2.5
- Dice so Nice! configuration corrected to fix Mac dice not using correct faces.
- Added Setting to allow player to choose a different portrait format for the character sheet.
- Removed empty fields from to chat cards on item descriptions
- pointed references to skills and attributes on chat cards to correct localization strings

v2.2.4
- css fix for cross-platform visual parity

v2.2.3
- CSS fix for notes section
- adjustment on paths for backend to fix old chat card issues

v2.2.2
- Relationship item created
- Relationships added to the NOTE tab on the character sheet
    -https://github.com/fvtt-fria-ligan/vaesen-foundry-vtt/blob/master/asset/relations_screen.png?raw=true)
- Backend cleanup - removed obsolete templates etc.
- Updated Item sheets - Clearer UX in line with other sheets
- Added 'To Chat' button for items on Actor sheets click the word baloon to send the information on any item to the chat log!
- CSS fixes for the new roll dialogs

v2.2.1 
- Fixed error on zip file for dist

v2.2.0 
- Dice Rolling moved to [Year Zero Universal Roller](https://github.com/Stefouch/foundry-year-zero-roller)
    - this fixes [issue 11](https://github.com/fvtt-fria-ligan/vaesen-foundry-vtt/issues/11)
- Dialog and Tooltip text strings hunted down and fully prepared for localization. updated translations will have to rely on contributors but at least all the bits and bobs can be translated now!
- Beautification Pass 
    - Chat Cards updated for YZUR and styled to make pertinent information more apparent
    - Clear style indication for roll modes
    - individual dice results hidden in roll-up 
    - push button in chat when applicable
    - CSS for entire system updated for more pleasing aesthetic.
    - Fonts updated 

v2.1.8
- Spanish Language update

v2.1.7
- Vaesen Sheet redesigned (this completes this round of sheet rework!)
- additional data moved to roll-down on click format to make ledgibilty on sheets better
    - NPC Armor, Weapons and Gear 
    - Vaesen Conditions, Attacks, Magic, Armor, Gear 
- Column size on PC sheet adjusted to give favorites more breathing room

v2.1.6
- tabs layout variance from v9 to v0.8.8 fixed

v2.1.5
- Updated Layout of the NPC sheet - all relavant information is now on the main tab other tabs removed except the note tab which remains unchanged

v2.1.4
- Added roll dialog to the Recovery Rolls to allow for bonus dice from headquarters etc.
- Removed Damage from results in chat on things which have no damage.
- Added custom condition icons in foundry status icon menu (https://github.com/fvtt-fria-ligan/vaesen-foundry-vtt/blob/master/asset/status_icons.png?raw=true) 
- Tightned styled and clarified the roll dialog (https://github.com/fvtt-fria-ligan/vaesen-foundry-vtt/blob/master/asset/roll_dialog.png?raw=true) 


v2.1.3
- (bugfix) Agility modifier for Armor was not calculating in the roll dialog.  Now highest negative modifier for armor will apply to agility tests.
- (Change) Updated look and feel of Headquarters sheet.  Now all upgrades are on first page and "history" is relegated to a tab.
    - Upgrade presentation drastically contracted to make a more readable sheet
    - Upgrade information now 'slides' out under item when clicked.

v2.1.2
- (bugfix) inverted z-order of avatar image and border frame

V2.1.1
- Added Recovery Roll to conditon section of sheet
- Improved visibilty of condition selection

v2.0.9
- (bugfix) header image and token ring missing
- Added toggle to system settings to show or hide Vaesen Logo on character sheet 

v2.0.8
- Character Sheet redesign 
    - Added Favorites
    - consolidated attributes and skills
    - moved motivation, trauma etc. to sheet top
    - tighter layout overall


v2.0.7 
 - Localization Spainish
 - Localization Swedish
 - DSN update
 - 0.8.8 combatibility pass

v2.0.6
- Fix more fields: attack damage, range, and description; magic category; npc information; vaesen known, secret, and notes.

v2.0.5
- Fix HQ history notes field.

v2.0.4
- Fix more note field typos/errors.

v2.0.3
- Mark system as compatible with Foundry 0.8.7.
- Fix PC and NPC notes field saving.

v2.0.2
- Version bump to match Foundry admin.

v2.0.1
- More fixes for Foundry 0.8.6.

v2.0.0
- Compatibility with Foundry 0.8.6.

v1.9.4
- Transfer GitHub repo to Org fvtt-fria-ligan

v1.9.3
- Rollback of package name to 'vaesen'.

v1.9.1 
- Incremental release version number only.

