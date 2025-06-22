# Vaesen
The **OFFICIAL** system for playing Vaesen on Foundry VTT.  
This system provides character sheets and items for  your play, if you would like to have tables and other pre-made official contnent check out the offical core ruleset Module
    - https://freeleaguepublishing.com/shop/vaesen-2/foundry-vtt-module-vaesen-rpg

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

* CSS optimization - convert current CSS structure to SASS based pre-processor for future ease of adjustment
    - underway

## Related Website
- https://foundryvtt.com/
- https://freeleaguepublishing.com/shop/vaesen-2/

## Licence
[GNU General Public License v3.0](https://choosealicense.com/licenses/gpl-3.0/)


## Release Notes
v6.0.5
= 🐛 Fix: Fast and slow actions setting and unetting incorrectly when YZE Combat module is active [#131](https://github.com/fvtt-fria-ligan/vaesen-foundry-vtt/issues/131)

v6.0.4 
- 🐛 Fix: Editor not visible on headquarter notes sheet.

v6.0.3 
- 🐛 Fix: Chat Bar Disappears When Editing Notes [#129](https://github.com/fvtt-fria-ligan/vaesen-foundry-vtt/issues/129)

v6.0.2
- 🐛 Fix: Favorite weapons were not rolling fixes issue [#128](https://github.com/fvtt-fria-ligan/vaesen-foundry-vtt/issues/128)
- 🐛 Fix: Favorite armor was not rolling

v6.0.1 
- 🐛 Fix: NPC sheets were not rolling weapons
- 🐛 Fix: NPC sheets were not rolling armor

v6.0.0 
- Feature: Updated to latest version of Year Zero Universal Roller (YZUR)
- Removed: This version of the Vaesen system requires Foundry VTT v12 or higher, this gives us a clean slate and allows us to fix all the deprecation warnings!


v5.0.0
- Major Release! BACK UP YOUR WORLDS BEFORE UPGRADING! This release updates the system for foundry v12. It also DROPS support for foundry v10.  
- 🐛 Fix: Fixed the warning for data references #81
- 🐛 Fix: Items not linking correctly from character generation 
- 🐛 Fix: Dice rolls not working in v12
- 🐛 Fix: CSS changes in v12 that made sheets look ugly
- 🐛 Fix: Chargen throws error and dies when core module is not installed
- 🐛 Fix: favorite items not working 
- 🐛 Fix: Add item button for HQ upgrades not working
- 🐛 Fix: condition check not updating on character sheet for Vaesen 

v4.6.4
- 🐛 fix error happening on Forge: players getting a message of lacking of permission

v4.6.1
- 🐛 system was attempting to update the change log for actors without one which caused changes to fail on NPC and Vaesen actor type [#117](https://github.com/fvtt-fria-ligan/vaesen-foundry-vtt/issues/117)
- 🐛 error when updating actors when no scene was active

v4.6.0
- ✨ Use Foundry's tooltip instead of browser `title`
- 🐛 Conditions was showing as `undefined` in changelog

v4.5.3
- 🐛 Fix: Fixed CSS on member data tab for lists to populate correctly  

v4.5.2
- 🐛 Fix: Removed rollable tag from skills on member data tab of headquarter sheet  

v4.5.1
- 🐛 Fix: HQ was losing data when updating ownership, editor for notes was hidden.  

v4.5.0
- ✨ Add changelog for Players and Headerquater by @Cussa in https://github.com/fvtt-fria-ligan/vaesen-foundry-vtt/pull/114
- ✨ Separate Starting Equipment from the normal ones by @Cussa in https://github.com/fvtt-fria-ligan/vaesen-foundry-vtt/pull/114

v4.4.1
- Update german localization by @Tarubain in https://github.com/fvtt-fria-ligan/vaesen-foundry-vtt/pull/107
- Update README.md by @sanderdatema in https://github.com/fvtt-fria-ligan/vaesen-foundry-vtt/pull/108
- Update README.md by @Cussa in https://github.com/fvtt-fria-ligan/vaesen-foundry-vtt/pull/109
- 🐛 Allow NPCs to have some statuses by @Cussa in https://github.com/fvtt-fria-ligan/vaesen-foundry-vtt/pull/111

v4.4.0
- ✨ link archetypes, talents and items in Chargen to their journal pages and items
  ![Chargen improvements](asset/chargen_links.png?raw=true)
- 💄 use default UI settings for player sheet
- ✨ Headquater members' statistics: a non-meta-gaming way to check who is the best to do some roll
  ![Member Statistics](asset/member_statistics.png?raw=true)

v4.3.1
- 🐛 Fix: get weapon icon when dragging to macro bar
- 🐛 Fix: Vagabond start equipment should be "Quarterstaff" (fix #104)
- 🐛 Fix: removes "None" from Talent selection
- 💄🐛 UI/Fix: corrects the player character sheet cut on the bottom
- 🐛 Fix: Chargen issue when re-roll character
- 🐛 Fix: remove click/roll functionality from the limited character sheet

v4.3.0
- Improvement: any roll using the `/r` chat command now shows the result of the roll directly
  ![D66 Roll](asset/d66roll.png?raw=true)
- Deployment Feature: automatically reports to Foundry when a new release is created

v4.2.1
- Fixed: css heights on inputs sometimes cut off tails of letters

v4.2.0
- Feature: Added random Character Generator!
  ![Character Generation](https://github.com/fvtt-fria-ligan/vaesen-foundry-vtt/blob/master/asset/chargen.png?raw=true)  

v4.1.2
- Fast and Slow action not working properly for NPCs and Vaesen.
- Fix the migration when having more than one headquarter, as it's running every login.

v4.1.1
- Fix the migration, as it's running every login.

v4.1.0
- Added a 'headquarters' item to the player sheet.  Selecting a headquarter actor will give the player access to the upgrades at the HQ for dice pools

v4.0.0
- Major Release! BACK UP YOUR WORLDS BEFORE UPGRADING! 
- Moved conditions to active effects, exisitng actors will be migrated to the new system. [[#78](https://github.com/fvtt-fria-ligan/vaesen-foundry-vtt/issues/78)]
- Status Icons on tokens now relate to the conditions on the actor. You can toggle them from the HUD, or the sheet.  [#56](https://github.com/fvtt-fria-ligan/vaesen-foundry-vtt/issues/56)
- Added settings to determine default behavior for NPC and Vaesen actors when they are dropped on a scene.
-- Note: if a vaesen is not linked you MUST add conditions from the token HUD or the copy of the actor on the scene rather than the unlinked actor in the sidebar. 
- Fixed: Weapon rolls where not using the correct conditions for the roll pool [[#83](https://github.com/fvtt-fria-ligan/vaesen-foundry-vtt/issues/83)]

v3.3.0
- Added fear rolls to the Character sheet [#74](https://github.com/fvtt-fria-ligan/vaesen-foundry-vtt/issues/74)
- Refactored the Actors to use a common base class to reduce code duplication and make it easier to maintain. [#75](https://github.com/fvtt-fria-ligan/vaesen-foundry-vtt/issues/75)
- Implemented drag and drop macros to fear rolls
- Added selection of talents, gear and other items to the roll dialog
- Added details to the chat card for rolls to break down the dice pool
- Redesigned the Roll Dialog to more clearly show the components of the roll

v3.2.0
- Added Limited Character Sheet, Limited permisions show player a sheet with reduced visibility, allowing secrets, traumas and other information to be hidden from non-owners. (issue [#62](https://github.com/fvtt-fria-ligan/vaesen-foundry-vtt/issues/62))
- Added Stat and Skill fields to items as needed in the rules set. (issue [#31](https://github.com/fvtt-fria-ligan/vaesen-foundry-vtt/issues/31))  EXISTING ITEMS WILL NEED TO BE UPDATED TO USE THIS FEATURE. Premium Modules will be updated soon(tm)
- Added PC skills and Attributes can now be dragged to the Macro Bar this covers part of issue [#55](https://github.com/fvtt-fria-ligan/vaesen-foundry-vtt/issues/55)
- Updated Roll Dialog to show applicable items and talents for the current roll. selecting one will apply the bonus to the dice pool of the roll.
- Fixed: localization for status icons on the Token HUD (fixed issue [#67](https://github.com/fvtt-fria-ligan/vaesen-foundry-vtt/issues/67))
- Fixed: escaped HTML in Talent Description (issue [#57](https://github.com/fvtt-fria-ligan/vaesen-foundry-vtt/issues/57))


v3.1.6
- updated Brazillian Portuguese Localization
  
v3.1.5
- Updated rolls to use latest version of YZUR

v3.1.4
- Updated French Localization Thanks [Kirwiisp](https://github.com/Kirwiisp)
- Chnaged SVG on status icons to be more freindly to non-chrome browsers

v3.1.3
-fixed a bug that hid the value of an NPC's magic attribute

v3.1.2
- Fixed a bug with the inculded Initiative Deck that was breaking the name of the cards in v11

v3.1.1
- Updated and ready for v11 Foundry VTT
- Added Portuguese Localization thanks [Mike de Sousa](https://github.com/mikedsousa)  | Adicionado localização em português obrigado [Mike de Sousa](https://github.com/mikedsousa)
- Fixed layout of the Vaesen sheet.

v3.0.7
- Fixed Resource Rolling on the Player Sheet

v3.0.6
- Fixed manifest for Forge compatibility

v3.0.5
- Added Ukrainian Localization thanks [GMonlineua](https://github.com/GMonlineua)
- Added an Initiative Deck to the system for use with [Year Zero Combat Engine](https://github.com/fvtt-fria-ligan/yearzero-combat-fvtt)
   -- Special thanks to Ashes for Ashe from the Foundry Discord for the amazing art work for the cards!
   
v3.0.4
- Added text enrichment to the notes fields on the various actor sheets.

v3.0.3
- Bugfix: duplicate actor fails in v10 
- Style Fix: Dice rolls in chat had li letters under the image and number in chat when premium modules were enabled this is now fixed
- NPC information and notes now have enriched text.  this will roll out to all other sheets soon(tm).

v3.0.1 
 - v10 release

v3.0.0
 - v10-testing

v2.3.6 
- Fixed header alignments

v2.3.5
- Fixed spacing and headers on HQ sheet for upgrades

v2.3.4
 - Fixed colors on DSN dice
 - Added German Localization thanks [Ivy Coyote](https://github.com/IvyCoyote) (issue[33](https://github.com/fvtt-fria-ligan/vaesen-foundry-vtt/issues/33))
 - fixed display of conditions on Vaesen sheet. (issue [35](https://github.com/fvtt-fria-ligan/vaesen-foundry-vtt/issues/35))

v2.3.3
 - Fixed double roll for icons on player combat tab

v2.3.2
-fixed css for Vasen sheet note field not showing.

v2.3.1 
- Updated Swedish Localization thanks to Hasselfloff!


Welcome to the Alpha build of the Vaesen System for Foundry VTT v10
This release is an early build for testing on the V10 upgrade of foundry 
**DO NOT MOVE TO THIS SYSTEM FOR REAL YET THINGS MAY CHANGE AND BREAK** 

### In this release
- v10 compatibility
- css rewrite to move to SASS and a CUBEcss model


