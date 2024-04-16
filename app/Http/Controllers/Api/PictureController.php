<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\UploadPictureRequest;
use App\Repositories\Picture\PictureRepository;
use Exception;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Support\Facades\Storage;

class PictureController extends BaseApiController
{
    protected PictureRepository $pictureRepository;

    public function __construct(PictureRepository $pictureRepository)
    {
        $this->pictureRepository = $pictureRepository;
    }

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
            $this->pictureRepository->create([
                'link' => $path,
                'cake_id' => $request->cakeId,
            ]);

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
     * @param  string $picture
     * @return \Illuminate\Http\Response
     */
    public function show(string $picture)
    {
        $picture = $this->pictureRepository->find($picture);
        if ($picture) {
            Storage::get($picture->link);

            return response()->download(Storage::path($picture->link), 'image' . $picture->id);
        }

        abort(404, __('http-statuses.404'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  string $picture
     * @return \Illuminate\Http\Response
     */
    public function destroy(string $picture)
    {
        $picture = $this->pictureRepository->find($picture);
        $error = [];
        try {
            Storage::get($picture->link);
            Storage::delete($picture->link);
        } catch (Exception $e) {
            array_push($error, $e->getMessage());
        }

        if (count($error) !== 0) {
            return response()->json(['success' => false]);
        }

        $picture->delete();

        return response()->json(['success' => true]);
    }
}
