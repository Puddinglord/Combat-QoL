export class CombatQoL {
  constructor() {
    this.forceTargetSelection = game.settings.get('combat-qol', 'forceTargetSelection');
    this.autoRemoveTarget = game.settings.get('combat-qol', 'autoRemoveTarget');
    this.autoSelectOnTurn = game.settings.get('combat-qol', 'autoSelectOnTurn');
    this.autoOpenSheetNPC = game.settings.get('combat-qol', 'autoOpenSheetNPC');
    this.autoOpenSheetPlayer = game.settings.get('combat-qol', 'autoOpenSheetPlayer');
    this.autoCloseSheet = game.settings.get('combat-qol', 'autoCloseSheet');
    this.autoOpenSheet = null;

    this.getParentSheetSetting();
  }

  listenForHooks() {
    Hooks.on('updateCombat', (...args) => {
      // First we need to remove all the targeted tokens to keep a new turn fresh
      if (this.autoRemoveTarget) {
        this.untargetDeadTokens();
        this.untargetAllTokens(args);
      }

      // Then we need to auto select the current turn's token
      if (this.autoSelectOnTurn) {
        this.selectToken(args);

        // If we have the token selected then we can open the attached sheet automatically
        if (this.autoOpenSheet) {
          // Do they want the previous sheet to close?
          if (this.autoCloseSheet) {
            this.closeSheet(args);
          }

          // If you want to open NPC sheets automatically
          if (this.autoOpenSheetNPC) {
            this.openSheetNPC(args);
          }

          // If you want to open Player sheets automatically
          if (this.autoOpenSheetPlayer) {
            this.openSheetPlayer(args);
          }
        }
      }
    });

    Hooks.on('preCreateChatMessage', (data) => {
      if (this.forceTargetSelection) {
        if (data.flags.pf2e.context.type !== 'attack-roll') {
          return true;
        }

        if (!this.isSelectedAndTargeted()) {
          return false;
        }
      }
    });

    Hooks.on('onChange', () => {
      console.log('Change was made!');
    });
  }

  getParentSheetSetting() {
    if (this.openSheetNPC || this.openSheetPlayer) {
      this.autoOpenSheet = true;
    } else {
      this.autoOpenSheet = false;
    }
  }

  selectToken(args) {
    const ownedTokens = canvas.tokens['ownedTokens'];
    const currentCombatant = args[0]['combatant'];

    for (let i = 0; i < ownedTokens.length; i++) {
      if (ownedTokens[i].data.name === currentCombatant.name) {
        ownedTokens[i].control({ releaseOthers: true });
        break; // If we found it early then there's no more to do
      }
    }
  }

  untargetAllTokens(...args) {
    const combat = args[0];
    if (game.user.isGM || canvas.tokens.controlled.find((t) => t.id === combat.previous?.tokenId)) {
      game.user.targets.forEach((t) => {
        t.setTarget(false, { releaseOthers: false });
      });
      game.user.targets.clear();
    }
  }

  untargetDeadTokens() {
    game.user.targets.forEach((t) => {
      if (t.actor?.data.data.attributes.hp.value <= 0) {
        t.setTarget(false, { releaseOthers: false });
        game.user.targets.delete(t);
      }
    });
  }

  openSheetNPC(args) {
    const currentCombatant = this.getCurrentCombatant(args);

    if (currentCombatant.players.length === 0) {
      currentCombatant.actor.sheet.render(true, { token: currentCombatant.actor }).maximize();
    }
  }

  openSheetPlayer(args) {
    const currentCombatant = this.getCurrentCombatant(args);

    if (currentCombatant.players.length === 1) {
      currentCombatant.actor.sheet.render(true, { token: currentCombatant.actor }).maximize();
    }
  }

  // TODO: Make this work in the next version.
  minimizeSheet(args) {}

  // TODO: Make this work in the next version.
  bringSheetToFront() {}

  closeSheet(args) {
    const previousCombatant = this.getPreviousCombatant(args);

    previousCombatant.actor.sheet.close();
  }

  isSelectedAndTargeted() {
    let playerToken = canvas.tokens.controlled[0];

    if (!playerToken) {
      console.log('No token selected!');
      ui.notifications.error('You have not selected your token. Please select your token using left-click!');

      return false;
    }

    if (game.user.targets.size === 0) {
      ui.notifications.error('You have not targeted a token. Please select your token by left-clicking it and your target by alt+left-clicking the token you want to target.');

      return false;
    }

    return true;
  }

  getCurrentCombatant(args) {
    const currentCombatant = args[0]['combatant'];

    return currentCombatant;
  }

  getPreviousCombatant(args) {
    const totalNumberOfCombatants = args[0].combatants.length;
    const combatantList = args[0]['turns'];
    const currentTurnNumber = args[0]['turn'];
    let previousCombatantNumber = null;

    if (currentTurnNumber === 0) {
      previousCombatantNumber = totalNumberOfCombatants - 1;
    } else {
      previousCombatantNumber = currentTurnNumber - 1;
    }

    return combatantList[previousCombatantNumber];
  }
}
