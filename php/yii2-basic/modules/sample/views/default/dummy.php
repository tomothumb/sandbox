<div class="sample-default-index">
    <h1><?= $this->context->action->uniqueId ?></h1>
    <p>
        This is the view content for action "<?= $this->context->action->id ?>".
        The action belongs to the controller "<?= get_class($this->context) ?>"
        in the "<?= $this->context->module->id ?>" module.
    </p>

    <p>PROP1:
        <?= $d->prop1; ?>
    </p>
    <p>PROP2:
        <?= $d->prop2; ?>
    </p>

    <p>
        You may customize this page by editing the following file:<br>
        <code><?= __FILE__ ?></code>
    </p>
</div>
