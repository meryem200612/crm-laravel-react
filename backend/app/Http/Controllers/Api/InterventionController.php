<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Intervention;
use Illuminate\Http\Request;

class InterventionController extends Controller
{
    public function index(Request $request)
    {
        $query = Intervention::with(['client', 'technicien']);

        if ($request->has('statut') && $request->statut !== '') {
            $query->where('statut', $request->statut);
        }

        if ($request->has('client_id') && $request->client_id !== '') {
            $query->where('client_id', $request->client_id);
        }

        return response()->json($query->orderBy('date', 'desc')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'client_id'   => 'required|exists:clients,id',
            'user_id'     => 'nullable|exists:users,id',
            'description' => 'required|string',
            'statut'      => 'in:en_attente,en_cours,terminé',
            'date'        => 'required|date',
        ]);

        $data['statut'] = $data['statut'] ?? 'en_attente';
        $intervention = Intervention::create($data);
        $intervention->load(['client', 'technicien']);

        return response()->json($intervention, 201);
    }

    public function show(Intervention $intervention)
    {
        $intervention->load(['client', 'technicien']);
        return response()->json($intervention);
    }

    public function update(Request $request, Intervention $intervention)
    {
        $data = $request->validate([
            'client_id'   => 'sometimes|exists:clients,id',
            'user_id'     => 'nullable|exists:users,id',
            'description' => 'sometimes|required|string',
            'statut'      => 'sometimes|in:en_attente,en_cours,terminé',
            'date'        => 'sometimes|date',
        ]);

        $intervention->update($data);
        $intervention->load(['client', 'technicien']);

        return response()->json($intervention);
    }

    public function destroy(Intervention $intervention)
    {
        $intervention->delete();
        return response()->json(['message' => 'Intervention supprimée.']);
    }
}
