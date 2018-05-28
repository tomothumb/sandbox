<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class CommentNotification extends Notification
{
    use Queueable;

    protected $target_post;
    protected $target_user;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(\App\User $target_user, \App\Post $target_post)
    {
        $this->target_post = $target_post;
        $this->target_user = $target_user;

    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
//    public function toMail($notifiable)
//    {
//        return (new MailMessage)
//                    ->line('The introduction to the notification.')
//                    ->action('Notification Action', url('/'))
//                    ->line('Thank you for using our application!');
//    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'message' => '<a href="/user/'.$this->target_user->id.'/post/'.$this->target_post->id.'">'.$this->target_post->subject.'</a>'." にコメントがありました",
            'target_user_id' => $this->target_user->id,
            'target_post_id' => $this->target_post->id
        ];
    }
}
