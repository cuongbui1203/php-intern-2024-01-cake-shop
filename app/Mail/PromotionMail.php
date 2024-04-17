<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PromotionMail extends Mailable
{
    use Queueable;
    use SerializesModels;

    protected array $cakes;
    protected string $name;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(array $cakes, string $name)
    {
        $this->cakes = $cakes;
        $this->name = $name;
        $this->locale(app()->getLocale());
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('Mails.Promotion', [
            'cakes' => $this->cakes,
            'name' => $this->name,
        ]);
    }
}
