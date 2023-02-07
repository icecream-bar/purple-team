/**
 * Module dependencies
 */
const router = require('nordic/ragnar').router();
const { authentication } = require('odin/security');
const { cors } = require('frontend-remote-modules/middlewares');

/**
 * Routes handlers
 */
const massiveActions = require('./handlers/massiveActions');
const configurations = require('./handlers/configurations');
const moneyOut = require('./handlers/moneyOut');
const withdrawals = require('./handlers/withdrawals');
const moneyIn = require('./handlers/moneyIn');
const reports = require('./handlers/reports');
const bankingConnections = require('./handlers/bankingConnections');
const chavesAccounts = require('./handlers/chavesAccounts');
const tedAccounts = require('./handlers/tedAccounts');
const bankAccounts = require('./handlers/bankAccounts');
const refunds = require('./handlers/refunds');
const pix = require('./handlers/pix');
const allowedUsers = require('./handlers/allowedUsers');
const automaticWithdrawals = require('./handlers/automaticWithdrawals');
const manualWithdrawals = require('./handlers/manualWithdrawals');
const asyncProcesses = require('./handlers/asyncProcesses');
const transferManager = require('./handlers/transferManager');

router.use(cors());
router.use(authentication());

router.use(require('odin-addons/api/sites'));
router.use(require('odin-addons/api/users'));
router.use(require('odin-shared-sessions/api/sharedSession'));

router.use('/massive_actions', massiveActions);
router.use('/configurations', configurations);
router.use('/moneyout', moneyOut);
router.use('/withdrawals', withdrawals);
router.use('/moneyin', moneyIn);
router.use('/reports', reports);
router.use('/banking_connections', bankingConnections);
router.use('/chaves_accounts', chavesAccounts);
router.use('/bank_accounts', bankAccounts);
router.use('/ted_accounts', tedAccounts);
router.use('/bank_accounts', bankAccounts);
router.use('/refunds', refunds);
router.use('/pix', pix);
router.use('/allowed_users', allowedUsers);
router.use('/automatic_withdrawals', automaticWithdrawals);
router.use('/manual_withdrawals', manualWithdrawals);
router.use('/async-process', asyncProcesses);
router.use('/transfer_manager', transferManager);


/**
 * Expose API router
 */
module.exports = router;
