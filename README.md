# Combat-QoL

![GitHub all releases](https://img.shields.io/github/downloads/Puddinglord/combat-qol/total?style=for-the-badge&color=green)
![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/Puddinglord/combat-qol/CodeQL/main?style=for-the-badge)

Makes running combat easier and more automated letting you focus on telling your story instead of the tokens.

Please note. I developed this with PF2e in mind. I will be working on making it system agnostic in a future update.

This module has the following features:

* Forces the selection of the attacking token and targeting the token you wish to attack.
  * I use a lot of automation in my games and I **need** my players to target what they want to attack. When they forget it's a small hastle on my end to manually check the attack against the AC of the monster and then apply the damage. This will pop up an error if one of the conditions aren't met and will not produce any roll. Currently this only works for attacks labeled with the `attack-roll` label.
* Automatically removes all targets at the end of each turn.
  * This helps clean up each turn so you can start fresh! Now you never have to remind yourself or your players to clear their targets again!
* Automatically selects the current turns token for you.
  * Now you can go straight to targeting instead of clicking on your token first. It's the little things in life, right?
* Can automatically open NPC character sheets when it's their turn.
  * Now you can keep your screen clear and not have to remember where the current token is so you can get the sheet. It will pop up for you so you can focus on the story.
* Can automatically open Player character sheets when it's their turn.
  * This is useful for players if they want their character sheet open during their turn but not when it's not their turn. Or for the GM that like to see what that character can do on their turn.
* Can automatically close the previous sheet that was open.
  * If using the two settings above, this one will close them after their turn is over. Keep that screen clean!
* Can automatically minimize the previous sheet that was open.
  * Very similar to the above setting but this one just minimizes the sheet instead of closing it. Useful if you need to reference a sheet when it's not the tokens turn but still want a clean screen.

## Notes

* **Please make sure you set your current game system in the settings!**
* In PF2e you can either close **or** minimize the sheets that were previously opened.
* In D&D 5e you can only minimize the sheet for now.

## Known Issues

* If you close a sheet with the `auto close sheet` setting enabled it will open again when the turn comes around but it might not close. I am aware of this and am working on a fix.
* If you close a sheet with the `auto minimize sheet` setting enabled it will open again but it might not minimize anymore when its turn is over. I am aware of this and am working on a fix.

## Unknown Issues

If you find an issue please submit the issue on Github. Please include as much information as possible so I can issue a fix as soon as I can.
