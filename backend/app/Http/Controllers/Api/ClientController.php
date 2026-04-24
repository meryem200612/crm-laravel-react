<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\Request;
class ClientController extends Controller
{
    public function index()
    {
        return response()->json(Client::withCount('interventions')->orderBy('created_at', 'desc')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nom'       => 'required|string|max:255',
            'email'     => 'nullable|email|max:255',
            'telephone' => 'nullable|string|max:50',
            'adresse'   => 'nullable|string',
        ]);

        $client = Client::create($data);
        return response()->json($client, 201);
    }

    public function show(Client $client)
    {
        $client->load(['interventions.technicien']);
        return response()->json($client);
    }

    public function update(Request $request, Client $client)
    {
        $data = $request->validate([
            'nom'       => 'sometimes|required|string|max:255',
            'email'     => 'nullable|email|max:255',
            'telephone' => 'nullable|string|max:50',
            'adresse'   => 'nullable|string',
        ]);

        $client->update($data);
        return response()->json($client);
    }

    public function destroy(Client $client)
    {
        $client->delete();
        return response()->json(['message' => 'Client supprimé.']);
    }
}
