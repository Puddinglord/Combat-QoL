import { CombatQoL } from './src/combant-qol.js';

Hooks.once('init', () => {
  console.log('Registering game settings for Combat QoL...');

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
    default: true,
    type: Boolean,
    onChange: () => location.reload(),
  });

  game.settings.register('combat-qol', 'autoCloseSheet', {
    name: 'COMBAT_QOL.autoCloseSheet',
    hint: 'COMBAT_QOL.autoCloseSheetHint',
    scope: 'user',
    config: true,
    default: true,
    type: Boolean,
    onChange: () => location.reload(),
  });

  const combatQoL = new CombatQoL().listenForHooks();
});
