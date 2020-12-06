import { CombatQoL } from './src/combant-qol.js';

Hooks.once('init', () => {
  game.settings.register('combat-qol', 'currentGameSystem', {
    name: 'COMBAT_QOL.currentGameSystem',
    hint: 'COMBAT_QOL.currentGameSystemHint',
    scope: 'world',
    config: true,
    default: 'pf2e',
    type: String,
    choices: {
      pf2e: 'COMBAT_QOL.pf2e',
      dnd5e: 'COMBAT_QOL.dnd5e',
    },
    onChange: () => location.reload(),
  });

  game.settings.register('combat-qol', 'forceTargetSelection', {
    name: 'COMBAT_QOL.forceTargetSelection',
    hint: 'COMBAT_QOL.forceTargetSelectionHint',
    scope: 'world',
    config: true,
    default: true,
    type: Boolean,
    onChange: () => location.reload(),
  });

  game.settings.register('combat-qol', 'autoRemoveTarget', {
    name: 'COMBAT_QOL.autoRemoveTarget',
    hint: 'COMBAT_QOL.autoRemoveTargetHint',
    scope: 'world',
    config: true,
    default: true,
    type: Boolean,
    onChange: () => location.reload(),
  });

  game.settings.register('combat-qol', 'autoSelectOnTurn', {
    name: 'COMBAT_QOL.autoSelectOnTurn',
    hint: 'COMBAT_QOL.autoSelectOnTurnHint',
    scope: 'world',
    config: true,
    default: true,
    type: Boolean,
    onChange: () => location.reload(),
  });

  game.settings.register('combat-qol', 'autoOpenSheetNPC', {
    name: 'COMBAT_QOL.autoOpenSheetNPC',
    hint: 'COMBAT_QOL.autoOpenSheetNPCHint',
    scope: 'user',
    config: true,
    default: true,
    type: Boolean,
    onChange: () => location.reload(),
  });

  game.settings.register('combat-qol', 'autoOpenSheetPlayer', {
    name: 'COMBAT_QOL.autoOpenSheetPlayer',
    hint: 'COMBAT_QOL.autoOpenSheetPlayerHint',
    scope: 'user',
    config: true,
    default: false,
    type: Boolean,
    onChange: () => location.reload(),
  });

  // If we are not in the pf2e system, disable the option to close sheets for now
  if (game.settings.get('combat-qol', 'currentGameSystem') === 'pf2e') {
    game.settings.register('combat-qol', 'autoCloseSheet', {
      name: 'COMBAT_QOL.autoCloseSheet',
      hint: 'COMBAT_QOL.autoCloseSheetHint',
      scope: 'user',
      config: true,
      default: false,
      type: Boolean,
      onChange: () => location.reload(),
    });
  }

  game.settings.register('combat-qol', 'autoMinimizeSheet', {
    name: 'COMBAT_QOL.autoMinimizeSheet',
    hint: 'COMBAT_QOL.autoMinimizeSheetHint',
    scope: 'user',
    config: true,
    default: false,
    type: Boolean,
    onChange: () => location.reload(),
  });

  const combatQoL = new CombatQoL();
  combatQoL.listenForHooks();
});
