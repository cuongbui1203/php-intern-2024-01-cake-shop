<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UploadPictureRequest;
use App\Models\Picture;
use Exception;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Support\Facades\Storage;

class PictureController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\UploadPictureRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(UploadPictureRequest $request)
    {
        $path = Storage::put('cakes' . $request->cakeId, $request->file('image'));
        try {
            $picture = new Picture();
            $picture->link = $path;
            $picture->cake_id = $request->cakeId;
            $picture->save();

            return response()->json(['success' => true]);
        } catch (Exception $e) {
            Storage::delete($path);

            return response()->json([
                'success' => false,
                'message' => __('uploadImageFail'),
            ], HttpResponse::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Picture $picture
     * @return \Illuminate\Http\Response
     */
    public function show(Picture $picture)
    {
        // dd(Storage::get($picture->link));
        try {
            Storage::get($picture->link);

            return response()->download(Storage::path($picture->link), 'image' . $picture->id);
        } catch (Exception $e) {
            abort(404, __('http-statuses.404'));
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Picture $picture
     * @return \Illuminate\Http\Response
     */
    public function destroy(Picture $picture)
    {
        $error = [];
        try {
            Storage::get($picture->link);
            Storage::delete($picture->link);
        } catch (Exception $e) {
            array_push($error, $e->getMessage());
        }

        $picture->delete();

        return response()->json(['success' => true]);
    }
}
