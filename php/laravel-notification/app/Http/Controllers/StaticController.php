<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Menu\Laravel\Html;
use Spatie\Menu\Laravel\Link;
use Spatie\Menu\Laravel\Menu;

class StaticController extends Controller
{
    public function index()
    {
        $menu = \Menu::new([
            Link::to('/', 'Home'),
            Link::to('/static', 'Static 1')
        ]);

        $menu->add(Link::to('/static', 'Static 2')->setActive());
        $menu->link('/static', 'Static 3');
        $menu->add(Html::raw('<p><strong>RAW HTML 1</strong></p>'));
        $menu->html('<p><strong>RAW HTML 2</strong></p>');

        // Sub Menu
        $menu->add(
            \Menu::new([
                HTML::raw('Submenu Heading'),
                Link::to('/', 'Submenu Home'),
                Link::to('/static', 'Submenu Static 1')
            ])
        );

        // Sub Menu2
        $menu2 = \Menu::new()
            ->add(Link::to('/static', 'Static 2'))
            // No header, `Menu` instance
            ->submenu(\Menu::new()
                ->link('/introduction', 'Introduction2')
                ->link('/requirements', 'Requirements2')
                ->link('/installation-setup', 'Installation and Setup2')
            )
            // String header, `callable`
            ->submenu('<h2>Basic Usage</h2>',
                \Menu::new()
                    ->link('/your-first-menu', 'Your First Menu3')
                    ->link('/working-with-items', 'Working With Items3')
                    ->link('/adding-sub-menus', 'Adding Sub Menus3')
            )
        ;

        // Sub Menu3
        $menu3 = \Menu::new()
            // No header, `\Menu` instance
            ->submenu(\Menu::new()
                ->link('/introduction', 'Introduction')
                ->link('/requirements', 'Requirements')
                ->link('/installation-setup', 'Installation and Setup')
            )
            // String header, `callable`
            ->submenu('<h2>Basic Usage</h2>', function (Menu $menu) {
                $menu
//                    ->prefixLinks('/foo')
                    ->link('/your-first-menu', 'Your First Menu')
                    ->link('/working-with-items', 'Working With Items')
                    ->link('/adding-sub-menus', 'Adding Sub Menus');
            });
        ;

        // Menu Builder
        $menu_items = [
            '/' => 'Build Home',
            '/static' => 'Build Static'
        ];
        $menu4 = Menu::build($menu_items, function($menu, $label, $link) {
            $menu->link($link, $label);
        });


        return view('static.index',compact('menu','menu2','menu3','menu4'));
    }
}
