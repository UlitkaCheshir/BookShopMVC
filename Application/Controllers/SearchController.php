<?php
/**
 * Created by PhpStorm.
 * User: Radly
 * Date: 15.01.2019
 * Time: 9:43
 */

namespace Application\Controllers;

use Application\Services\BookService;


class SearchController extends BaseController {

    public function LoadSearchPage() {

        $search = $_POST['search'];

        $search = addslashes($search);
        $search = htmlspecialchars($search);
        $search = stripslashes($search);

        if($search == ''){
            exit("Начните вводить запрос");
        }

        $bookService = new BookService();

        $books = $bookService->SearchBook($search);

        $template = $this->twig->load('public/search-page.twig');

        echo $template->render( array(
            'books' => $books
        ) );

    } // LoadSearchPage

} // SearchController